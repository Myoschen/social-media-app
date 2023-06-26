import { RxMoon, RxSun } from "react-icons/rx";
import { Outlet } from "react-router-dom";
import { Center, IconButton, useColorMode } from "@chakra-ui/react";

export default function AuthLayout() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center w="full" h="100vh">
      <Outlet />
      <IconButton
        pos="fixed"
        right="3"
        top="3"
        size="sm"
        variant="ghost"
        icon={colorMode === "light" ? <RxMoon /> : <RxSun />}
        onClick={toggleColorMode}
        aria-label="dark mode"
      />
    </Center>
  );
}
