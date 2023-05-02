import { Posts } from '@/types';
import { Grid, Text } from '@chakra-ui/react';
import PostBlock from './post-block';
import PostSkeleton from './post-skeleton';

interface Props {
  posts?: Posts;
  isLoading: boolean;
}

function PostList({ posts, isLoading }: Props) {
  if (isLoading) {
    return (
      <Grid mt="10" maxW="720" gap="4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <PostSkeleton key={i} />
          ))}
      </Grid>
    );
  }

  return (
    <Grid mt="10" maxW="720" gap="4">
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
