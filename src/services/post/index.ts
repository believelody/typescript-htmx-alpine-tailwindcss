import service from "..";
import { CommentResponse } from "../../interfaces/comment.interface";
import { Post, PostResponse, PostsBuilderResponse, PostsResponse } from "../../interfaces/post.interface";
import { Author } from "../../interfaces/user.interface";
import utils from "../../utils";
import api from "../api";

const fetchAll = async (limit: number, skip: number, detailBaseURL: string): Promise<PostsBuilderResponse> => {
  const res = await api.get(`/posts?limit=${limit}&skip=${skip}`) as PostsResponse;
  const posts = utils.post.constructPosts(res.posts, detailBaseURL);
  return { posts, total: res.total };
}

const fetchById = async (id: number): Promise<PostResponse> => {
  const post = await api.get(`/posts/${id}`) as Post;
  const prevPost = await api.get(`/posts/${id - 1}?select=id`) as Post;
  const nextPost = await api.get(`/posts/${id + 1}?select=id`) as Post;
  const author = await service.user.fetchAuthor(post.userId) as Author;
  // delete post.userId;

  return { post, prevPost, nextPost, author };
}

const fetchPostComments = async (id: number): Promise<CommentResponse> => {
  return await api.get(`/comments/post/${id}`);
}

export default { fetchAll, fetchById, fetchPostComments };