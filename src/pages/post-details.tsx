import { useParams } from 'react-router-dom';
import { CommentList, NewComment } from '@/components/comment';
import { PostBlock } from '@/components/post';
import { useQueryPost } from '@/hooks/post';
import { VStack } from '@chakra-ui/react';

function PostDetailsPage() {
  const { id } = useParams() as { id: string };
  const { post, isLoading } = useQueryPost(id);

  if (isLoading) return <span>Loading</span>;

  return (
    <VStack pt="50">
      <PostBlock post={post!} />
      <NewComment postId={post?.id!} />
      <CommentList postId={post?.id!} />
    </VStack>
  );
}

export default PostDetailsPage;
