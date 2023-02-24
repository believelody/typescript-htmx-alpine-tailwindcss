import { Post, PostBuilder } from "@interfaces/post.interface";

const constructPosts = (posts: Post[], userId: number | null = null): PostBuilder[] => posts.map((post, index) => ({
  background: `https://picsum.photos/id/${Math.ceil(Math.random() * 100)}/200/300`,
  alt: `content  ${index + 1}`,
  title: post.title,
  content: post.body,
  views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
  comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
  url: `/users/${userId ?? "me"}/posts/${post.id}`,
  tags: post.tags,
  id: post.id,
  userId: post.userId,
}));

export const userUtil = { constructPosts };