import { Router } from 'express';
import { PostController } from './post.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', protect, PostController.createPost);
router.get('/', protect, PostController.getFeedPosts);

export const PostRoutes = router;
