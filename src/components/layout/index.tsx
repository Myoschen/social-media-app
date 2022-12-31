import { Box, Container, Flex } from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { ROUTES } from 'lib/routes';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith(ROUTES.PROTECTED) && !user) {
      navigate(ROUTES.LOGIN);
    }
  }, [isLoading, pathname, user]);

  if (isLoading) return <span>Loading...</span>;

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Flex pt="16" pb="12">
          <Sidebar />
          <Box flex="4">
            <Outlet />
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default Layout;
