import { Router } from 'express';
import { UserController } from './user.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', protect, UserController.getMe);

export const UserRoutes = router;
