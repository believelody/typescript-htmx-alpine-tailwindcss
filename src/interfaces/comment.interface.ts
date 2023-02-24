import { Meta } from "./meta.interface";

interface CommentAuhtor {
  id: number;
  username: string;
}

export interface Comment {
	id: number;
	body: string;
	postId: number;
	user: CommentAuhtor;
}

export interface CommentRequestBody extends Omit<Comment, "id"> {}

export interface CommentResponse extends Meta {
	comments: Comment[];
}

export interface CommentUpdate extends Partial<CommentRequestBody> {}