import { z } from 'zod';

const ValidationSchema = z.object({
  text: z.string().min(1),
  username: z
    .string()
    .min(4, { message: 'The username must be 4 characters or more' })
    .max(16, { message: 'The username must be 16 characters or less' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'The username must contain only letters, numbers and underscore (_)'
    ),
  email: z.string().email({
    message: 'Invalid email. Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, { message: 'The password must be 8 characters or more' })
    .max(20, { message: 'The password must be 20 characters or less' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'The password must be 8 characters or more' })
    .max(20, { message: 'The password must be 20 characters or less' }),
});

const LoginSchema = ValidationSchema.pick({
  email: true,
  password: true,
}).required();
const SignUpSchema = ValidationSchema.pick({
  username: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords don't match.",
});
const PostSchema = ValidationSchema.pick({ text: true });
const CommentSchema = ValidationSchema.pick({ text: true });
const ProfileSchema = ValidationSchema.pick({ username: true });

type LoginInput = z.infer<typeof LoginSchema>;
type SignUpInput = z.infer<typeof SignUpSchema>;
type PostInput = z.infer<typeof PostSchema>;
type CommentInput = z.infer<typeof CommentSchema>;
type ProfileInput = z.infer<typeof ProfileSchema>;

export { LoginSchema, SignUpSchema, PostSchema, CommentSchema, ProfileSchema };

export type { LoginInput, SignUpInput, PostInput, CommentInput, ProfileInput };
