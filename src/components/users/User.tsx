import { Button, Tag, VStack } from '@chakra-ui/react';
import Avatar from 'components/common/Avatar';
import { ROUTES } from 'lib/routes';
import { IUser } from 'lib/types';
import { Link } from 'react-router-dom';

interface UserProps {
  isLoading: boolean;
  user: IUser;
}

function User({ isLoading, user }: UserProps) {
  return (
    <VStack bg="gray.100" shadow="sm" rounded="md" p="4" spacing="3">
      <Avatar user={user} />
      <Tag size="sm" colorScheme="teal">
        @{user.username}
      </Tag>
      <Button
        as={Link}
        to={`${ROUTES.PROTECTED}/profile/${user.id}`}
        size="sm"
        variant="link"
        colorScheme="teal"
      >
        View Profile
      </Button>
    </VStack>
  );
}

export default User;
