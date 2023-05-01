import { Link } from 'react-router-dom';
import { ROUTES } from '@/libs/routes';
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';

import type { Nullish, User } from '@/types';
interface AvatarProps extends ChakraAvatarProps {
  user: Nullish<User>;
}

function Avatar({ user, ...rest }: AvatarProps) {
  return (
    <ChakraAvatar
      as={Link}
      src={user?.avatar}
      name={user?.username}
      to={`${ROUTES.USERS}/${user?.id}`}
      _hover={{ opacity: 0.8 }}
      {...rest}
    />
  );
}

export default Avatar;
