import { formatDistanceToNow } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import { Avatar, UserLink } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useDeleteComment } from '@/hooks/comment';
import { useQueryUser } from '@/hooks/user';
import { Comment } from '@/types';
import { Box, Flex, IconButton, Spacer, Text } from '@chakra-ui/react';

interface Props {
  comment: Comment;
}

function CommentBlock({ comment }: Props) {
  const {
    state: { user: authUser },
  } = useAuth();
  const { user, isLoading: userLoading } = useQueryUser(comment.uid);
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(
    comment.id
  );

  if (userLoading) return <span>Loading</span>;

  return (
    <Box maxW="720" w="full" py="2">
      <Flex gap="2" p="4">
        <Avatar user={user} size="sm" />
        <Box flex="1">
          <Flex>
            <Box>
              <UserLink user={user} />
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(comment.date)} ago
              </Text>
            </Box>
            <Spacer />
            {authUser?.id === comment.uid && (
              <IconButton
                icon={<FaTrash />}
                size="sm"
                variant="ghost"
                colorScheme="blackAlpha"
                aria-label="delete comment"
                isRound
                onClick={deleteComment}
                isLoading={deleteLoading}
              />
            )}
          </Flex>
          <Box pt="2">
            <Text fontSize="sm">{comment.text}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default CommentBlock;
