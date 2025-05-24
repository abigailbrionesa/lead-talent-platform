import { object, string } from 'zod';

export const loginSchema = object({
  email: string({ required_error: 'email is required' })
    .min(1, 'email is required')
    .email('invalid email'),
  password: string({ required_error: 'password is required' }).min(
    1,
    'password is required'
  ),
});

export const registerSchema = object({
  name: string({ required_error: 'name is required' }).min(1, 'name is required'),
  email: string({ required_error: 'email is required' })
    .min(1, 'email is required')
    .email('invalid email'),
  password: string({ required_error: 'password is required' })
    .min(1, 'password is required')
    .min(8, 'password must be at least 8 characters'),
});