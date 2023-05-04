import { SubmitHandler, useForm } from 'react-hook-form';
import { RxPencil1 } from 'react-icons/rx';
import { redirect } from 'react-router-dom';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useAddComment } from '@/hooks/comment';
import { ROUTES } from '@/libs/routes';
import { CommentInput, CommentSchema } from '@/utils/form-schema';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

interface NewCommentProps {
  pid: string;
}

function NewComment({ pid }: NewCommentProps) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<CommentInput>({
    resolver: zodResolver(CommentSchema),
  });
  const { addComment, isLoading } = useAddComment();

  const onSubmit: SubmitHandler<CommentInput> = async ({ content }) => {
    if (user) {
      await addComment({
        pid,
        uid: user.id,
        content,
      });
      reset();
    }
  };

  if (!user) {
    return redirect(ROUTES.LOGIN);
  }

  return (
    <Box maxW="720" w="full" py="6">
      <Flex gap="2" p="4">
        <Avatar id={user?.id} avatar={user?.avatar} size="sm" />
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              size="sm"
              variant="flushed"
              placeholder="Write comment..."
              {...register('content')}
            />
            <Flex pt="2">
              <Button
                ml="auto"
                leftIcon={<RxPencil1 />}
                size="sm"
                variant="ghost"
                type="submit"
                isLoading={isLoading}
              >
                Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default NewComment;
