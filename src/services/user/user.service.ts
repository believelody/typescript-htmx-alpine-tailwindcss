import { FetchError } from '@interfaces/fetch.interface';
import { PostResponse, PostsBuilderResponse, PostsResponse } from '@interfaces/post.interface';
import { Author, UserResponse } from '@interfaces/user.interface';
import { fetch } from '@services/fetch';
import { userUtil } from '@utils/user/user.util';
import meService from './me.service';

const fetchById = async (id: number, fields: string[] = []): Promise<UserResponse> => {
  const path = `/users/${id}`;
  if (fields.length) {
    path.concat(`?select=${fields.join(',')}`)
  }
  return await fetch.get(path);
}

const fetchAuthor = async (id: number): Promise<Author> => await fetchById(id, ['username', 'id']) as Author;

const fetchPosts = async (id: number, limit: number, skip: number): Promise<PostsBuilderResponse | FetchError> => {
  const res = await fetch.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`) as PostsResponse;
  const posts = userUtil.constructPosts(res.posts, id);
  return { posts, total: res.total };
}

const fetchPostById = async (id: number, postId: number): Promise<PostResponse | FetchError> => {
  const { posts } = await fetch.get(`/users/${id}/posts`) as PostsResponse;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return { message: `Post ${postId} not found`};
  }
  const postIndex = posts.findIndex((p) => p.id === post?.id);
  const prevPost = posts[postIndex - 1];
  const nextPost = posts[postIndex + 1];
  const author = await fetchAuthor(id);
  delete post.userId;

  return { post, prevPost, nextPost, author };
}

export const userService = { fetchById, fetchPosts, fetchPostById, fetchAuthor, me: meService };