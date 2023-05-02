import { useParams } from 'react-router-dom';
import { CommentList, NewComment } from '@/components/comment';
import { PostBlock, PostSkeleton } from '@/components/post';
import { useQueryPost } from '@/hooks/post';
import { Box } from '@chakra-ui/react';

function PostDetailsPage() {
  const { id } = useParams() as { id: string };
  const { post, isLoading } = useQueryPost(id);

  if (isLoading) {
    return (
      <Box w="full" maxW="720" mx="auto">
        <PostSkeleton />
      </Box>
    );
  }

  return (
    <Box w="full" maxW="720" mx="auto">
      <PostBlock post={post!} />
      <NewComment postId={post?.id!} />
      <CommentList postId={post?.id!} />
    </Box>
  );
}

export default PostDetailsPage;
