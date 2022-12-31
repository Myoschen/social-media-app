import Avatar from 'components/common/Avatar';
import { useAuth } from 'hooks/auth';
import { ROUTES } from 'lib/routes';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, Tag, VStack } from '@chakra-ui/react';

function ActiveUser() {
  const { user } = useAuth();

  return (
    <VStack spacing="5" mt="8" mb="4">
      <Avatar user={user} size="xl" />
      <Tag colorScheme="teal" fontWeight="600">
        @{user?.username}
      </Tag>
      <Button
        as={Link}
        to={`${ROUTES.PROTECTED}/profile/${user?.id}`}
        colorScheme="teal"
        w="full"
      >
        Edit Profile
      </Button>
    </VStack>
  );
}

function Sidebar() {
  return (
    <Box
      flex="1"
      display={['none', 'block']}
      pos="sticky"
      top="16"
      px="6"
      h="100%"
    >
      <ActiveUser />
      <VStack>
        <Divider />
        <Button
          as={Link}
          to={ROUTES.USERS}
          variant="outline"
          colorScheme="teal"
          mt="4"
          size="sm"
        >
          ALL USERS
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
