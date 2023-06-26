import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import {
  RxBookmark,
  RxBookmarkFilled,
  RxChatBubble,
  RxHeart,
  RxHeartFilled,
  RxTrash,
} from "react-icons/rx";
import { Link } from "react-router-dom";
import { Avatar, FullLoading, UserLink } from "@/components/ui";
import { useAuth } from "@/lib/hooks/auth";
import {
  useDeletePost,
  useToggleBookmark,
  useToggleLikePost,
} from "@/lib/hooks/post";
import { useQueryUser } from "@/lib/hooks/user";
import { Post } from "@/types";
import { assertAuthenticated } from "@/lib/hooks/auth";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

interface HeaderProps {
  userId: string;
  date: Date;
}

function Header({ userId, date }: HeaderProps) {
  const bgColor = useColorModeValue("#fafafa", "#202020");
  const borderColor = useColorModeValue("gray.100", "gray.800");
  const { user, isLoading } = useQueryUser(userId);

  if (isLoading || !user) {
    return <FullLoading />;
  }

  return (
    <Flex
      p="3"
      align="center"
      borderBottomWidth="1px"
      borderColor={borderColor}
      bgColor={bgColor}
    >
      <Avatar id={user.id} avatar={user.avatar} />
      <Box ml="3">
        <UserLink id={user.id} username={user.username} />
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
  const cancelRef = useRef<HTMLButtonElement>(null);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { toggleLike } = useToggleLikePost(post.id);
  const { toggleBookmark } = useToggleBookmark(post.id);
  const { deletePost } = useDeletePost(post.id);

  assertAuthenticated(user);

  const isLiked = user.likes.includes(post.id);
  const isBookmarked = user.bookmarks.includes(post.id);

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
        <Text>{post.totalLikes}</Text>
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
        <Text>{post.totalComments}</Text>
      </HStack>
      <HStack spacing="0.5">
        <IconButton
          icon={isBookmarked ? <RxBookmarkFilled /> : <RxBookmark />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="comment"
          isRound
          onClick={toggleBookmark}
        />
        <Text>{post.totalBookmarks}</Text>
      </HStack>
      <Spacer />
      {post.uid === user.id ? (
        <>
          <IconButton
            icon={<RxTrash />}
            size="sm"
            variant="ghost"
            aria-label="comment"
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
              <AlertDialogHeader>Delete Post?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to delete your post?
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
                  onClick={deletePost}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </HStack>
  );
}

interface BlockProps {
  post: Post;
}

export default function PostBlock({ post }: BlockProps) {
  const borderColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Box w="full" maxW="720px">
      <Box borderWidth="1px" borderColor={borderColor} borderRadius="md">
        <Header userId={post.uid} date={post.createdAt.toDate()} />
        <Box px="4" py="2" minH="120px">
          <Text wordBreak="break-word" fontSize="md">
            {post.content}
          </Text>
        </Box>
        <Actions post={post} />
      </Box>
    </Box>
  );
}
