import { useLogout } from 'hooks/auth';
import { ROUTES } from 'lib/routes';
import { Link as RouteLink } from 'react-router-dom';
import { Button, Container, Flex, HStack, Link } from '@chakra-ui/react';

function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <Flex
      pos="fixed"
      zIndex="3"
      w="full"
      h="16"
      borderTop="6px solid"
      borderTopColor="teal.400"
      shadow="sm"
      justify="center"
      bg="white"
    >
      <Container maxW="container.xl">
        <HStack h="full" justify="space-between" align="center" px="4">
          <Link
            as={RouteLink}
            to={ROUTES.DASHBOARD}
            color="teal"
            fontWeight="bold"
          >
            HOME
          </Link>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={logout}
            isLoading={isLoading}
          >
            Logout
          </Button>
        </HStack>
      </Container>
    </Flex>
  );
}

export default Navbar;
