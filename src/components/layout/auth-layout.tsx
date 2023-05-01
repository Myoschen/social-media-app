import { Outlet } from 'react-router-dom';
import { Center } from '@chakra-ui/react';

function AuthLayout() {
  return (
    <Center w="full" h="100vh">
      <Outlet />
    </Center>
  );
}

export default AuthLayout;
