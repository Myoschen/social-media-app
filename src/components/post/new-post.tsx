import { SubmitHandler, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '@/hooks/auth';
import { useAddPost } from '@/hooks/post';
import { PostInput, PostSchema } from '@/utils/form-schema';
import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

function NewPost() {
  const {
    state: { user },
  } = useAuth();
  const { addPost, isLoading } = useAddPost();
  const { register, handleSubmit, reset } = useForm<PostInput>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    if (user) {
      await addPost({
        uid: user.id,
        text: data.text,
      });
      reset();
    }
  };

  return (
    <Box maxW="720" mx="auto" px="4" py="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justify="space-between">
          <Heading>New Post</Heading>
          <Button type="submit" isLoading={isLoading} loadingText="Loading">
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
