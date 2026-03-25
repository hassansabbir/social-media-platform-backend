import { Request, Response } from 'express';
import { UserValidation } from './user.validation';
import { UserService } from './user.service';
import { AuthRequest } from '../../middlewares/authMiddleware';

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = UserValidation.registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const result = await UserService.registerUser(parsed.data);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = UserValidation.loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const result = await UserService.loginUser(parsed.data);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      res.status(401).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = UserValidation.updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    if (!req.user || !req.user._id) {
       res.status(401).json({ error: 'Unauthorized' });
       return;
    }

    const updatedUser = await UserService.updateProfile(req.user._id, parsed.data);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const UserController = {
  register,
  login,
  getMe,
  updateProfile,
};
