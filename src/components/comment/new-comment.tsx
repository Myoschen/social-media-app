import { SubmitHandler, useForm } from "react-hook-form";
import { RxPencil1 } from "react-icons/rx";
import { Avatar } from "@/components/ui";
import { useAuth } from "@/lib/hooks/auth";
import { useAddComment } from "@/lib/hooks/comment";
import { assertAuthenticated } from "@/lib/hooks/auth";
import { CommentInput, CommentSchema } from "@/lib/form-schema";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  pid: string;
}

export default function NewComment({ pid }: Props) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<CommentInput>({
    resolver: zodResolver(CommentSchema),
  });
  const { addComment, isLoading } = useAddComment();

  assertAuthenticated(user);

  const onSubmit: SubmitHandler<CommentInput> = async ({ content }) => {
    await addComment({
      pid,
      uid: user.id,
      content,
    });
    reset();
  };

  return (
    <Box maxW="720" w="full" py="6">
      <Flex gap="2" p="4">
        <Avatar id={user.id} avatar={user.avatar} size="sm" />
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              size="sm"
              variant="flushed"
              placeholder="Write comment..."
              {...register("content")}
            />
            <Flex pt="2">
              <Button
                ml="auto"
                leftIcon={<RxPencil1 />}
                size="sm"
                variant="ghost"
                type="submit"
                isLoading={isLoading}
              >
                Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
