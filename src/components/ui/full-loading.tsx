import { Center, Spinner, useColorModeValue } from '@chakra-ui/react';

function FullLoading() {
  const emptyColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Center minH="100vh">
      <Spinner
        color="blue.400"
        size="lg"
        thickness="2px"
        emptyColor={emptyColor}
      />
    </Center>
  );
}

export default FullLoading;
