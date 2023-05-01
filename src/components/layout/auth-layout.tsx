import { Outlet } from 'react-router-dom';
import { Center, useColorModeValue } from '@chakra-ui/react';

function AuthLayout() {
  const bgColor = useColorModeValue('white', '#222');

  return (
    <Center w="full" h="100vh" bgColor={bgColor}>
      <Outlet />
    </Center>
  );
}

export default AuthLayout;
