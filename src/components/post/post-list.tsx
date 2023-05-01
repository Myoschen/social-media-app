import { Posts } from '@/types';
import { Grid, Text } from '@chakra-ui/react';
import PostBlock from './post-block';

interface Props {
  posts?: Posts;
}

function PostList({ posts }: Props) {
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
