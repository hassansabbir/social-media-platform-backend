import { z } from 'zod';

export const UserValidation = {
  registerSchema: z.object({
    name: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  loginSchema: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  updateProfileSchema: z.object({
    name: z.string().min(2).optional(),
    bio: z.string().max(160).optional(),
    avatarUrl: z.string().url().optional().or(z.literal('')),
  }),
};
