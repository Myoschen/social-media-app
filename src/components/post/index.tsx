import { IPost } from '@/libs/types';
import { Box, Text } from '@chakra-ui/react';
import Header from './Header';
import Actions from './Actions';

interface PostProps {
  post: IPost;
}

function Post({ post }: PostProps) {
  return (
    <Box px="4" w="full" maxW="720">
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header uid={post.uid} date={post.date} />
        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize="md">
            {post.text}
          </Text>
        </Box>
        <Actions post={post} />
      </Box>
    </Box>
  );
}

export default Post;
