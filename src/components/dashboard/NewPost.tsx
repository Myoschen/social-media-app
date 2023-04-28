import { useAuth } from '@/hooks/auth';
import { useAddPost } from '@/hooks/posts';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { PostSchema } from '@/utils/form-validate';
import { InferType } from 'yup';
import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = InferType<typeof PostSchema>;

function NewPost() {
  const { user, isLoading: authLoading } = useAuth();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(PostSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addPost({
      uid: user?.id!,
      text: data.text,
    });
    reset();
  };

  return (
    <Box maxW="720" mx="auto" px="4" py="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justify="space-between">
          <Heading>New Post</Heading>
          <Button
            colorScheme="teal"
            type="submit"
            size="md"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          {...register('text')}
        />
      </form>
    </Box>
  );
}

export default NewPost;
