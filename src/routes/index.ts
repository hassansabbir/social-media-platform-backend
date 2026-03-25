import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { PostRoutes } from '../modules/post/post.route';

const router = Router();

// Modular Routes Collection
router.use('/auth', UserRoutes);
router.use('/posts', PostRoutes);

export default router;
