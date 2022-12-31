import { Button } from '@chakra-ui/react';
import { ROUTES } from 'lib/routes';
import { IUser } from 'lib/types';
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
