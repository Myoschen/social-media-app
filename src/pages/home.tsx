import { NewPost, PostList } from "@/components/post";
import { useQueryPosts } from "@/lib/hooks/post";
import { Box } from "@chakra-ui/react";

export default function HomePage() {
  const { posts, isLoading } = useQueryPosts();
  return (
    <Box w="full" maxW="720" mx="auto">
      <NewPost />
      <PostList posts={posts} isLoading={isLoading} />
    </Box>
  );
}
