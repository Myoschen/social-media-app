import { RxMoon, RxSun } from 'react-icons/rx';
import { Outlet } from 'react-router-dom';
import { Center, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

function AuthLayout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', '#222');

  return (
    <Center w="full" h="100vh" bgColor={bgColor}>
      <Outlet />
      <IconButton
        pos="fixed"
        right="3"
        top="3"
        size="sm"
        variant="ghost"
        icon={colorMode === 'light' ? <RxMoon /> : <RxSun />}
        onClick={toggleColorMode}
        aria-label="dark mode"
      />
    </Center>
  );
}

export default AuthLayout;
