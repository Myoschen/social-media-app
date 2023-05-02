import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../sidebar';

function AppLayout() {
  const location = useLocation();
  const {
    state: { user },
  } = useAuth();

  return user ? (
    <Flex minH="100vh">
      <Sidebar />
      <Box as="main" w="calc(100% - 280px)" ml="auto" py="8">
        <Outlet />
      </Box>
    </Flex>
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  );
}

export default AppLayout;
