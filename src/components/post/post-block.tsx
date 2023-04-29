import { formatDistanceToNow } from 'date-fns';
import { FaHeart, FaRegComment, FaRegHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Avatar, UserLink } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useQueryComments } from '@/hooks/comment';
import { useDeletePost, useToggleLike } from '@/hooks/post';
import { useQueryUser } from '@/hooks/user';
import { ROUTES } from '@/libs/routes';
import { Post } from '@/types';
import { Box, Flex, HStack, IconButton, Spacer, Text } from '@chakra-ui/react';

interface HeaderProps {
  uid: string;
  date: number;
}

function Header({ uid, date }: HeaderProps) {
  const { user, isLoading } = useQueryUser(uid);

  if (isLoading) return <span>Loading</span>;

  return (
    <Flex
      align="center"
      borderBottom="1px solid"
      borderColor="gray.200"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="sm" />
      <Box ml="2">
        <UserLink user={user} />
        <Text fontSize="sm" color="gray.500">
          {formatDistanceToNow(date)} ago
        </Text>
      </Box>
    </Flex>
  );
}

interface ActionsProps {
  post: Post;
}

function Actions({ post }: ActionsProps) {
  const {
    state: { user },
  } = useAuth();
  const isLiked = post.likes.includes(user?.id!);
  const { toggleLike, isLoading: likeLoading } = useToggleLike({
    id: post.id,
    isLiked,
    uid: user?.id!,
  });
  const { deletePost, isLoading: deleteLoading } = useDeletePost(post.id);
  const { comments, isLoading: commentsLoading } = useQueryComments(post.id);

  return (
    <HStack p="2">
      <HStack spacing="0.5">
        <IconButton
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          aria-label="like"
          isRound
          onClick={toggleLike}
          isLoading={likeLoading}
        />
        <Text>{post.likes.length}</Text>
      </HStack>
      <HStack spacing="0.5">
        <IconButton
          as={Link}
          to={`${ROUTES.AUTHORIZED}/posts/${post.id}`}
          icon={<FaRegComment />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="comment"
          isRound
          isLoading={commentsLoading}
        />
        <Text>{comments?.length}</Text>
      </HStack>
      <Spacer />
      {post.uid === user?.id ? (
        <IconButton
          icon={<FaTrash />}
          size="sm"
          colorScheme="blackAlpha"
          variant="ghost"
          aria-label="comment"
          isRound
          onClick={deletePost}
          isLoading={deleteLoading}
        />
      ) : null}
    </HStack>
  );
}

interface BlockProps {
  post: Post;
}

function PostBlock({ post }: BlockProps) {
  return (
    <Box px="4" w="full" maxW="720">
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header uid={post.uid} date={post.date} />
        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize="md">
            {post.text}
          </Text>
        </Box>
        <Actions post={post} />
      </Box>
    </Box>
  );
}

export default PostBlock;
