import * as yup from 'yup';

const validation = {
  username: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  text: yup.string().required(),
  avatar: yup.mixed().test('required', 'Please select a file', (v) => {
    return v && v.length;
  }),
};

// https://github.com/jquense/yup/issues/1179
const LoginSchema = yup.object({}).shape({
  email: validation.email,
  password: validation.password,
});

const RegisterSchema = yup.object({}).shape({
  username: validation.username,
  email: validation.email,
  password: validation.password,
});

const PostSchema = yup.object({}).shape({
  text: validation.text,
});

const CommentSchema = yup.object({}).shape({
  text: validation.text,
});

const ProfileSchema = yup.object({}).shape({
  // avatar: validation.avatar,
  username: validation.username,
});

export {
  LoginSchema,
  RegisterSchema,
  PostSchema,
  CommentSchema,
  ProfileSchema,
};
