import { CommentResponse } from "@interfaces/comment.interface";
import { Post, PostResponse, PostsBuilderResponse, PostsResponse } from "@interfaces/post.interface";
import { Author } from "@interfaces/user.interface";
import { fetch } from "@services/fetch";
import { userService } from "@services/user/user.service";
import { postUtil } from "@utils/post/post.util";

const findAll = async (limit: number, skip: number, detailBaseURL: string): Promise<PostsBuilderResponse> => {
  const res = await fetch.get(`/posts?limit=${limit}&skip=${skip}`) as PostsResponse;
  const posts = postUtil.constructPosts(res.posts, detailBaseURL);
  return { posts, total: res.total };
}

const findOneById = async (id: number): Promise<PostResponse> => {
  const post = await fetch.get(`/posts/${id}`) as Post;
  const prevPost = await fetch.get(`/posts/${id - 1}?select=id`) as Post;
  const nextPost = await fetch.get(`/posts/${id + 1}?select=id`) as Post;
  const author = await userService.findAuthor(post.userId);
  delete post.userId;

  return { post, prevPost, nextPost, author };
}

const findPostComments = async (id: number): Promise<CommentResponse> => {
  return await fetch.get(`/comments/post/${id}`);
}

export const postService = { findAll, findOneById, findPostComments };