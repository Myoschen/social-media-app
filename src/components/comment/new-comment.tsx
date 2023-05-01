import { SubmitHandler, useForm } from 'react-hook-form';
import { RxPencil1 } from 'react-icons/rx';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useAddComment } from '@/hooks/comment';
import { CommentInput, CommentSchema } from '@/utils/form-schema';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

interface NewCommentProps {
  postId: string;
}

function NewComment({ postId }: NewCommentProps) {
  const {
    state: { user },
  } = useAuth();
  const { register, handleSubmit, reset } = useForm<CommentInput>({
    resolver: zodResolver(CommentSchema),
  });
  const { addComment, isLoading } = useAddComment({
    postId,
    uid: user?.id!,
  });

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    await addComment(data.text);
    reset();
  };

  return (
    <Box maxW="720" w="full" py="6">
      <Flex gap="2" p="4">
        <Avatar user={user} size="sm" />
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              size="sm"
              variant="flushed"
              placeholder="Write comment..."
              {...register('text')}
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
