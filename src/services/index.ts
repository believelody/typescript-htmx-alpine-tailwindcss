import productService from './product';
import postService from './post';
import aboutService from './about';
import teamService from './team';
import userService from './user';
import authService from './auth';

const service = {
  product: productService,
  post: postService,
  about: aboutService,
  team: teamService,
  user: userService,
  auth: authService
};

export default service;