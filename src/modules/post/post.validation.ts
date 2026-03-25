import { z } from 'zod';

export const PostValidation = {
  createPostSchema: z.object({
    content: z.string().min(1, 'Content cannot be empty'),
  }),
};
