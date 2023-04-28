import { useAuth } from '@/hooks/auth';
import { useQueryComments } from '@/hooks/comments';
import { useDeletePost, useToggleLike } from '@/hooks/posts';
import { ROUTES } from '../../libs/routes';
import { IPost } from '../../libs/types';
import {
  FaComment,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HStack, IconButton, Spacer, Text } from '@chakra-ui/react';

interface ActionsProps {
  post: IPost;
}

function Actions({ post }: ActionsProps) {
  const { user, isLoading: userLoading } = useAuth();
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
          isLoading={likeLoading || userLoading}
        />
        <Text>{post.likes.length}</Text>
      </HStack>
      <HStack spacing="0.5">
        <IconButton
          as={Link}
          to={`${ROUTES.PROTECTED}/posts/${post.id}`}
          icon={<FaRegComment />}
          size="sm"
          colorScheme="blue"
          variant="ghost"
          aria-label="comment"
          isRound
          isLoading={commentsLoading || userLoading}
        />
        <Text>{comments?.length}</Text>
      </HStack>
      <Spacer />
      {!userLoading && post.uid === user?.id && (
        <IconButton
          icon={<FaTrash />}
          size="sm"
          colorScheme="blackAlpha"
          variant="ghost"
          aria-label="comment"
          isRound
          onClick={deletePost}
          isLoading={deleteLoading || userLoading}
        />
      )}
    </HStack>
  );
}

export default Actions;
