import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui';
import { useAuth, useLogout } from '@/hooks/auth';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { ROUTES } from '../../libs/routes';

function Sidebar() {
  const {
    state: { user },
  } = useAuth();
  const { logout, loading } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box
      flex="1"
      display={['none', 'block']}
      pos="sticky"
      top="16"
      px="6"
      h="100%"
    >
      <VStack>
        <VStack spacing="5" mt="8" mb="4">
          <Avatar user={user} size="xl" />
          <Text fontWeight="600">{user?.username}</Text>
          <Button
            as={Link}
            to={`${ROUTES.USERS}/${user?.id}`}
            colorScheme="teal"
            w="full"
          >
            Profile
          </Button>
        </VStack>
        <Button
          colorScheme="teal"
          mt="4"
          size="sm"
          isLoading={loading}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
