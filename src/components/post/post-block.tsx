import { formatDistanceToNow } from 'date-fns';
import { RxBookmark, RxChatBubble, RxHeart, RxHeartFilled, RxTrash } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { Avatar, UserLink } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useQueryComments } from '@/hooks/comment';
import { useDeletePost, useToggleLikePost } from '@/hooks/post';
import { useQueryUser } from '@/hooks/user';
import { Post } from '@/types';
import { Box, Flex, HStack, IconButton, Spacer, Text, useColorModeValue } from '@chakra-ui/react';

interface HeaderProps {
  uid: string;
  date: number;
}

function Header({ uid, date }: HeaderProps) {
  const borderColor = useColorModeValue('gray.100', 'gray.800');
  const { user, isLoading } = useQueryUser(uid);

  if (isLoading) return <span>Loading</span>;

  return (
    <Flex
      p="3"
      align="center"
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Avatar user={user} />
      <Box ml="3">
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
  const { toggleLike } = useToggleLikePost({
    id: post.id,
    isLiked,
    uid: user?.id!,
  });
  const { deletePost } = useDeletePost(post.id);
  const { comments } = useQueryComments(post.id);

  return (
    <HStack p="2">
      <HStack spacing="0.5">
        <IconButton
          icon={isLiked ? <RxHeartFilled /> : <RxHeart />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          aria-label="like"
          isRound
          onClick={toggleLike}
        />
        <Text>{post.likes.length}</Text>
      </HStack>
      <HStack spacing="0.5">
        <IconButton
          as={Link}
          to={`/posts/${post.id}`}
          icon={<RxChatBubble />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="comment"
          isRound
        />
        <Text>{comments?.length}</Text>
      </HStack>
      <HStack spacing="0.5">
        <IconButton
          icon={<RxBookmark />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="comment"
          isRound
        />
        <Text>{comments?.length}</Text>
      </HStack>
      <Spacer />
      {post.uid === user?.id ? (
        <IconButton
          icon={<RxTrash />}
          size="sm"
          variant="ghost"
          aria-label="comment"
          isRound
          onClick={deletePost}
        />
      ) : null}
    </HStack>
  );
}

interface BlockProps {
  post: Post;
}

function PostBlock({ post }: BlockProps) {
  const borderColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box w="full" maxW="720">
      <Box borderWidth="1px" borderColor={borderColor} borderRadius="md">
        <Header uid={post.uid} date={post.date} />
        <Box px="4" py="2" minH="120px">
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
