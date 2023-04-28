import Post from '@/components/post';
import { IPost } from '@/libs/types';
import { Text, VStack } from '@chakra-ui/react';

interface PostListProps {
  posts?: IPost[];
}

function PostList({ posts }: PostListProps) {
  return (
    <VStack spacing="4">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No posts yet... Feeling a little lonely here.
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </VStack>
  );
}

export default PostList;
