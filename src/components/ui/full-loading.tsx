import { Center, Spinner, useColorModeValue } from '@chakra-ui/react';

function FullLoading() {
  const bgColor = useColorModeValue('white', '#222');
  const emptyColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Center minH="100vh" bgColor={bgColor}>
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
