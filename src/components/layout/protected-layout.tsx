import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { Box, Container, Flex } from '@chakra-ui/react';
import Sidebar from './sidebar';

function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { user },
  } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
    }
  }, [user]);

  return (
    <Container maxW="container.xl">
      <Flex pt="16" pb="12">
        <Sidebar />
        <Box flex="4">
          <Outlet />
        </Box>
      </Flex>
    </Container>
  );
}

export default ProtectedLayout;
