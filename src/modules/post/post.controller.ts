import { Request, Response } from 'express';
import { PostValidation } from './post.validation';
import { PostService } from './post.service';
import { AuthRequest } from '../../middlewares/authMiddleware';

const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = PostValidation.createPostSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    if (!req.user || !req.user._id) {
       res.status(401).json({ error: 'Unauthorized' });
       return;
    }

    const post = await PostService.createPost(req.user._id, parsed.data.content);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getFeedPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostService.getFeedPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const PostController = {
  createPost,
  getFeedPosts,
};
