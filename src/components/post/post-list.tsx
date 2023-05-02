import { Posts } from '@/types';
import { Box, Grid, SkeletonCircle, SkeletonText, Text, useColorModeValue } from '@chakra-ui/react';
import PostBlock from './post-block';

interface Props {
  posts?: Posts;
  isLoading: boolean;
}

function PostList({ posts, isLoading }: Props) {
  const borderColor = useColorModeValue('gray.50', 'gray.800');

  if (isLoading) {
    return (
      <Grid mt="10" maxW="720" mx="auto" gap="4">
        {Array(2)
          .fill(0)
          .map(() => (
            <Box
              padding="4"
              border="1px"
              borderColor={borderColor}
              rounded="md"
            >
              <SkeletonCircle size="12" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="3"
              />
            </Box>
          ))}
      </Grid>
    );
  }

  return (
    <Grid mt="10" maxW="720" mx="auto" gap="4">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No posts yet... Feeling a little lonely here.
        </Text>
      ) : (
        posts?.map((post) => <PostBlock key={post.id} post={post} />)
      )}
    </Grid>
  );
}

export default PostList;
