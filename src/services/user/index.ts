import { FetchError } from "../../interfaces/fetch.interface";
import { PostResponse, PostsBuilderResponse, PostsResponse } from "../../interfaces/post.interface";
import { Author, UserResponse } from "../../interfaces/user.interface";
import utils from "../../utils";
import api from "../api";
import meService from './me';

const fetchById = async (id: number, fields: string[] = []): Promise<UserResponse> => {
  const path = `/users/${id}`;
  if (fields.length) {
    path.concat(`?select=${fields.join(',')}`)
  }
  return await api.get(path);
}

const fetchAuthor = async (id: number): Promise<Author> => await fetchById(id, ['username', 'id']) as Author;

const fetchPosts = async (id: number, limit: number, skip: number): Promise<PostsBuilderResponse | FetchError> => {
  const res = await api.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`) as PostsResponse;
  const posts = utils.user.constructPosts(res.posts, id);
  return { posts, total: res.total };
}

const fetchPostById = async (id: number, postId: number): Promise<PostResponse | FetchError> => {
  const { posts } = await api.get(`/users/${id}/posts`) as PostsResponse;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return { message: `Post ${postId} not found`};
  }
  const postIndex = posts.findIndex((p) => p.id === post?.id);
  const prevPost = posts[postIndex - 1];
  const nextPost = posts[postIndex + 1];
  const author = await fetchAuthor(id);
  // delete post.userId;

  return { post, prevPost, nextPost, author };
}

export default { fetchById, fetchPosts, fetchPostById, fetchAuthor, me: meService };