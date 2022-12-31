import Post from 'components/post';
import { useQueryPost } from 'hooks/posts';
import { useParams } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';
import CommentList from './CommentList';
import NewComment from './NewComment';

function PostDetail() {
  const { id } = useParams() as { id: string };
  const { post, isLoading } = useQueryPost(id);

  if (isLoading) return <span>Loading</span>;

  return (
    <VStack pt="50">
      <Post post={post!} />
      <NewComment postId={post?.id!} />
      <CommentList postId={post?.id!} />
    </VStack>
  );
}

export default PostDetail;
