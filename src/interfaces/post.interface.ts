import { Meta } from "./meta.interface";
import { Author } from "./user.interface";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
}

export interface PostBuilder {
	background: string;
  alt: string;
  title: string;
  content: string;
  views: string;
  comments: number;
  url: string;
  tags: string[];
  id: number;
  userId: number;
}

export interface PostRequestBody extends Omit<Post, "id"> {}

export interface PostsResponse extends Meta {
	posts: Post[];
}

export interface PostsBuilderResponse extends Pick<Meta, "total"> {
	posts: PostBuilder[];
}

export interface PostResponse {
	post: Post;
	prevPost: Pick<Post, "id">;
	nextPost: Pick<Post, "id">;
	author: Author;
}

export interface PostUpdate extends Partial<PostRequestBody> {}