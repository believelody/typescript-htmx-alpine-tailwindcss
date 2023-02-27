import express from 'express';
import { authApiController } from './auth/auth-api.controller';
import { cartApiController } from './cart/cart-api.controller';
import { commentApiController } from './comment/comment-api.controller';
import { contactApiController } from './contact/contact-api.controller';
import { productsApiController } from './products/product-api.controller';
import { reactionApiController } from './reaction/reaction-api.controller';
import { subscriptionApiController } from './subscription/subscription-api.controller';
import { userApiController } from './user/user-api.controller';

const router = express.Router();

router.use('/subscription', subscriptionApiController);
router.use('/users', userApiController);
router.use('/comments', commentApiController);
router.use('/reaction', reactionApiController);
router.use('/auth', authApiController);
router.use('/contact', contactApiController);
router.use('/products', productsApiController);
router.use('/cart', cartApiController);

export const apiController = router;