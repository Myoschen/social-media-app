import Void from "@/assets/void.svg";
import { Posts } from "@/types";
import { AspectRatio, Grid, Image, Text, VStack } from "@chakra-ui/react";
import PostBlock from "./post-block";
import PostSkeleton from "./post-skeleton";

interface Props {
  posts?: Posts;
  isLoading: boolean;
}

export default function PostList({ posts, isLoading }: Props) {
  if (isLoading) {
    return (
      <Grid mt="10" maxW="720" gap="4">
        {Array.from({ length: 2 }, (_, i) => (
          <PostSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid mt="10" maxW="720" gap="4">
      {posts?.length === 0 ? (
        <VStack gap="2">
          <AspectRatio w="full" maxW="300" ratio={1}>
            <Image src={Void} alt="no posts" objectFit="cover" />
          </AspectRatio>
          <Text textAlign="center" fontSize="xl">
            No posts yet... Feeling a little lonely here.
          </Text>
        </VStack>
      ) : (
        posts?.map((post) => <PostBlock key={post.id} post={post} />)
      )}
    </Grid>
  );
}
