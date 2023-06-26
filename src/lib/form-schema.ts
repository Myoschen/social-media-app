import { z } from "zod";

const ValidationSchema = z.object({
  content: z.string().min(1),
  username: z
    .string()
    .min(4, { message: "The username must be 4 characters or more." })
    .max(16, { message: "The username must be 16 characters or less." })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)."
    ),
  bio: z.string(),
  email: z.string().email({
    message: "Invalid email. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "The password must be 8 characters or more." })
    .max(20, { message: "The password must be 20 characters or less." }),
  confirmPassword: z
    .string()
    .min(8, { message: "The password must be 8 characters or more." })
    .max(20, { message: "The password must be 20 characters or less." }),
});

export const LoginSchema = ValidationSchema.pick({
  email: true,
  password: true,
}).required();
export type LoginInput = z.infer<typeof LoginSchema>;

export const SignUpSchema = ValidationSchema.pick({
  username: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match.",
});
export type SignUpInput = z.infer<typeof SignUpSchema>;

export const PostSchema = ValidationSchema.pick({ content: true });
export type PostInput = z.infer<typeof PostSchema>;

export const CommentSchema = ValidationSchema.pick({ content: true });
export type CommentInput = z.infer<typeof CommentSchema>;

export const ProfileSchema = ValidationSchema.pick({
  username: true,
  bio: true,
});
export type ProfileInput = z.infer<typeof ProfileSchema>;
