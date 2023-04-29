import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { Box, Center, Container, Flex, Spinner } from '@chakra-ui/react';
import Sidebar from './sidebar';

function ProtectedLayout() {
  const navigate = useNavigate();
  const {
    state: { user, isChecked },
  } = useAuth();

  useEffect(() => {
    if (isChecked && !user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, isChecked]);

  return isChecked ? (
    <>
      <Container maxW="container.xl">
        <Flex pt="16" pb="12">
          <Sidebar />
          <Box flex="4">
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </>
  ) : (
    <Center minH="100vh">
      <Spinner size="lg" />
    </Center>
  );
}

export default ProtectedLayout;
