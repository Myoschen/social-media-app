import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { Box, Container, Flex } from '@chakra-ui/react';
import Sidebar from './sidebar';

function ProtectedLayout() {
  const location = useLocation();
  const {
    state: { user },
  } = useAuth();

  return user ? (
    <Container maxW="container.xl">
      <Flex pt="16" pb="12">
        <Sidebar />
        <Box flex="4">
          <Outlet />
        </Box>
      </Flex>
    </Container>
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  );
}

export default ProtectedLayout;
