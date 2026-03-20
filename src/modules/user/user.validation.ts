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
};
