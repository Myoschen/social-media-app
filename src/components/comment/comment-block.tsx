import { formatDistanceToNow } from 'date-fns';
import { useRef } from 'react';
import { RxTrash } from 'react-icons/rx';
import { Avatar, FullLoading, UserLink } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useDeleteComment } from '@/hooks/comment';
import { useQueryUser } from '@/hooks/user';
import { Comment } from '@/types';
import { assertAuthenticated } from '@/utils/assert';
import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, Spacer, Text,
    useColorModeValue, useDisclosure
} from '@chakra-ui/react';

interface Props {
  comment: Comment;
}

function CommentBlock({ comment }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const { user: auth } = useAuth();
  const { deleteComment } = useDeleteComment();
  const { user, isLoading: isUserLoading } = useQueryUser(comment.uid);

  assertAuthenticated(auth);

  if (isUserLoading || !user) {
    return <FullLoading />;
  }

  return (
    <Box maxW="720px" w="full" py="2">
      <Flex gap="2" p="4">
        <Avatar id={user.id} avatar={user.avatar} size="sm" />
        <Box flex="1">
          <Flex>
            <Box>
              <UserLink id={user.id} username={user.username} />
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(comment.createdAt.toDate())} ago
              </Text>
            </Box>
            <Spacer />
            {auth.id === user.id ? (
              <>
                <IconButton
                  icon={<RxTrash />}
                  size="sm"
                  variant="ghost"
                  aria-label="delete comment"
                  isRound
                  onClick={onOpen}
                />

                <AlertDialog
                  motionPreset="slideInBottom"
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isOpen={isOpen}
                  isCentered
                >
                  <AlertDialogOverlay />
                  <AlertDialogContent sx={{ bgColor }}>
                    <AlertDialogHeader>Delete Comment?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Are you sure you want to delete your comment?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        size="sm"
                        variant="ghost"
                        onClick={onClose}
                      >
                        No
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        variant="outline"
                        ml={3}
                        onClick={() => deleteComment(comment)}
                      >
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : null}
          </Flex>
          <Box pt="2">
            <Text fontSize="sm">{comment.content}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default CommentBlock;
