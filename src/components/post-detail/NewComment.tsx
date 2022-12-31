import Avatar from 'components/common/Avatar';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { CommentSchema } from 'utils/form-validate';
import { useAddComment } from 'hooks/comments';

interface NewCommentProps {
  postId: string;
}

type FormValues = InferType<typeof CommentSchema>;

function NewComment({ postId }: NewCommentProps) {
  const { user, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(CommentSchema),
  });
  const { addComment, isLoading: commentLoading } = useAddComment({
    postId,
    uid: user?.id!,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addComment(data.text);
    reset();
  };

  if (authLoading) return <span>Loading</span>;

  return (
    <Box maxW="720" w="full" py="6">
      <Flex gap="2" p="4">
        <Avatar user={user} size="sm" />
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register('text')}
              />
            </Box>
            <Flex pt="2">
              <Button
                type="submit"
                colorScheme="teal"
                size="xs"
                ml="auto"
                isLoading={commentLoading || authLoading}
                loadingText="Loading"
              >
                Add Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default NewComment;
