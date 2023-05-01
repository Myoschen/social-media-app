import { Link } from 'react-router-dom';
import { ROUTES } from '@/libs/routes';
import { Nullish, User } from '@/types';
import { Link as ChakraLink } from '@chakra-ui/react';

interface Props {
  user: Nullish<User>;
}

function UserLink({ user }: Props) {
  return (
    <ChakraLink
      as={Link}
      to={`${ROUTES.USERS}/${user?.id}`}
      fontWeight="medium"
    >
      {user?.username}
    </ChakraLink>
  );
}

export default UserLink;
