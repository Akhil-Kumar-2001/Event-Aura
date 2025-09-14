import { z } from 'zod';

export const SignupValidation = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters long'),

  email: z.string()
    .email('Invalid email address'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    role: z.enum(["attendee", "organizer"])
});
