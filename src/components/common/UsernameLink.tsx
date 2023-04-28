import { Button } from '@chakra-ui/react';
import { ROUTES } from '@/libs/routes';
import { IUser } from '@/libs/types';
import { Link } from 'react-router-dom';

interface UsernameLinkProps {
  user: IUser | undefined;
}

function UsernameLink({ user }: UsernameLinkProps) {
  return (
    <Button
      as={Link}
      to={`${ROUTES.PROTECTED}/profile/${user?.id}`}
      colorScheme="teal"
      variant="link"
    >
      @{user?.username}
    </Button>
  );
}

export default UsernameLink;
