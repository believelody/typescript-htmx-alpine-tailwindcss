import { CommentResponse } from "@interfaces/comment.interface";
import {
	Post,
	PostResponse,
	PostsBuilderResponse,
	PostsResponse,
} from "@interfaces/post.interface";
import { Author } from "@interfaces/user.interface";
import { fetch } from "@services/fetch";
import { userService } from "@services/user/user.service";
import { postUtil } from "@utils/post/post.util";

const findAll = async (
	limit: number,
	skip: number,
	detailBaseURL: string
): Promise<PostsBuilderResponse> => {
	const res = (await fetch.get(
		`/posts?limit=${limit}&skip=${skip}`
	)) as PostsResponse;
	const posts = postUtil.constructPosts(res.posts, detailBaseURL);
	return { posts, total: res.total };
};

const findOneById = async (id: number): Promise<PostResponse> => {
	const post = (await fetch.get(`/posts/${id}`)) as Post;
	const prevPost = id > 1 ? (await fetch.get(`/posts/${id - 1}?select=id`)) as Post : null;
	const nextPost = id < 150 ? (await fetch.get(`/posts/${id + 1}?select=id`)) as Post : null;
	const author = await userService.findAuthor(post.userId);

	return { post, prevPost, nextPost, author };
};

const findPostComments = async (id: number): Promise<CommentResponse> => {
	return await fetch.get(`/comments/post/${id}`);
};

export const postService = { findAll, findOneById, findPostComments };
