import { Post, PostResponse, PostsBuilderResponse, PostsResponse } from "../../interfaces/post.interface";
import service from "..";
import utils from "../../utils";
import api from "../api";
import { CommentResponse } from "../../interfaces/comment.interface";

const fetchPosts = async (id: number, limit: number, skip: number): Promise<PostsBuilderResponse> => {
  const res = await api.auth.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`) as PostsResponse;
  const posts = utils.user.constructPosts(res.posts);
  return { posts, total: res.total };
}

const fetchPostById = async (id: number, postId: number): Promise<PostResponse> => {
  const { posts } = await api.auth.get(`/users/${id}/posts`) as PostsResponse;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    throw new Error(`Post ${postId} not found`);
  }
  const postIndex = posts.findIndex((p) => p.id === post?.id);
  const prevPost = posts[postIndex - 1];
  const nextPost = posts[postIndex + 1];
  const author = await service.user.fetchAuthor(id);
  // delete post.userId;

  return { post, prevPost, nextPost, author };
}

const reactToPost = async (id: number, reactions: number): Promise<Post> => {
  return await api.auth.put(`/posts/${id}`, {
    body: { reactions }
  });
}

const commentPost = async (body: object): Promise<CommentResponse> => {
  return await api.auth.post(`/comments/add`, { body });
}

export default { fetchPosts, fetchPostById, reactToPost, commentPost };