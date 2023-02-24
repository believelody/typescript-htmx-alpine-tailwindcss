import express from 'express';
import subscriptionApi from './subscription';
import userApi from './user';
import commentApi from './comment';
import reactionApi from './reaction';
import authApi from './auth';
import contactApi from './contact';
import productsApi from './products';

const router = express.Router();

router.use('/subscription', subscriptionApi);
router.use('/users', userApi);
router.use('/comments', commentApi);
router.use('/reaction', reactionApi);
router.use('/auth', authApi);
router.use('/contact', contactApi);
router.use('/products', productsApi);

export default router;