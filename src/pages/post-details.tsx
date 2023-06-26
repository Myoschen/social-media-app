import { useParams } from "react-router-dom";
import { CommentList, NewComment } from "@/components/comment";
import { PostBlock, PostSkeleton } from "@/components/post";
import { useQueryPost } from "@/lib/hooks/post";
import { Box } from "@chakra-ui/react";

export default function PostDetailsPage() {
  const { id } = useParams() as { id: string };
  const { post, isLoading } = useQueryPost(id);

  if (isLoading) {
    return (
      <Box w="full" maxW="720" mx="auto">
        <PostSkeleton />
      </Box>
    );
  }

  return (
    <Box w="full" maxW="720" mx="auto">
      <PostBlock post={post!} />
      <NewComment pid={post?.id!} />
      <CommentList pid={post?.id!} />
    </Box>
  );
}
