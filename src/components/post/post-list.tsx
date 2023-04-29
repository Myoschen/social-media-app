import { Posts } from '@/types';
import { Text, VStack } from '@chakra-ui/react';
import PostBlock from './post-block';

interface Props {
  posts?: Posts;
}

function PostList({ posts }: Props) {
  return (
    <VStack spacing="4">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No posts yet... Feeling a little lonely here.
        </Text>
      ) : (
        posts?.map((post) => <PostBlock key={post.id} post={post} />)
      )}
    </VStack>
  );
}

export default PostList;
