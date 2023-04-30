import { Center, Spinner } from '@chakra-ui/react';

function FullLoading() {
  return (
    <Center minH="100vh">
      <Spinner size="lg" />
    </Center>
  );
}

export default FullLoading;
