import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui';
import { ROUTES } from '@/libs/routes';
import { User } from '@/types';
import { Button, Tag, VStack } from '@chakra-ui/react';

interface Props {
  user: User;
}

function UserCard({ user }: Props) {
  return (
    <VStack bg="gray.100" shadow="sm" rounded="md" p="4" spacing="3">
      <Avatar user={user} />
      <Tag size="sm" colorScheme="teal">
        {user.username}
      </Tag>
      <Button
        as={Link}
        to={`${ROUTES.AUTHORIZED}/profile/${user.id}`}
        size="sm"
        variant="link"
        colorScheme="teal"
      >
        View Profile
      </Button>
    </VStack>
  );
}

export default UserCard;
