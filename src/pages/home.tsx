import { NewPost, PostList } from '@/components/post';
import { useQueryPosts } from '@/hooks/post';
import { Box } from '@chakra-ui/react';

function HomePage() {
  const { posts, isLoading } = useQueryPosts();
  return (
    <Box w="full" maxW="720" mx="auto">
      <NewPost />
      <PostList posts={posts} isLoading={isLoading} />
    </Box>
  );
}

export default HomePage;
