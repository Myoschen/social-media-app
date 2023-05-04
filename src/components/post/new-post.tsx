import { SubmitHandler, useForm } from 'react-hook-form';
import { RxPaperPlane } from 'react-icons/rx';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '@/hooks/auth';
import { useAddPost } from '@/hooks/post';
import { PostInput, PostSchema } from '@/utils/form-schema';
import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

function NewPost() {
  const { user } = useAuth();
  const { addPost, isLoading } = useAddPost();
  const { register, handleSubmit, reset } = useForm<PostInput>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit: SubmitHandler<PostInput> = async ({ content }) => {
    if (user) {
      await addPost({
        uid: user.id,
        content,
      });
      reset();
    }
  };

  return (
    <Box maxW="720px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack justify="space-between">
          <Heading fontWeight="semibold">New Post</Heading>
          <Button
            rightIcon={<RxPaperPlane />}
            size="sm"
            variant="outline"
            type="submit"
            isLoading={isLoading}
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          mt="4"
          minH="160"
          resize="none"
          placeholder="Create a new post..."
          {...register('content')}
        />
      </form>
    </Box>
  );
}

export default NewPost;
