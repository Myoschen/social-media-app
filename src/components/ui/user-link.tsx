import { Link } from 'react-router-dom';
import { ROUTES } from '@/libs/routes';
import { Nullish, User } from '@/types';
import { Button } from '@chakra-ui/react';

interface Props {
  user: Nullish<User>;
}

function UserLink({ user }: Props) {
  return (
    <Button
      as={Link}
      to={`${ROUTES.USERS}/${user?.id}`}
      colorScheme="teal"
      variant="link"
    >
      {user?.username}
    </Button>
  );
}

export default UserLink;
