import { Box, SkeletonCircle, SkeletonText, useColorModeValue } from '@chakra-ui/react';

function PostSkeleton() {
  const borderColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box
      w="full"
      maxW="720"
      mx="auto"
      padding="4"
      border="1px"
      borderColor={borderColor}
      rounded="md"
    >
      <SkeletonCircle size="12" />
      <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="3" />
    </Box>
  );
}

export default PostSkeleton;
