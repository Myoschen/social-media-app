import { ROUTES } from 'lib/routes';
import { IUser } from 'lib/types';
import { Link } from 'react-router-dom';
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';

interface AvatarProps extends ChakraAvatarProps {
  user: IUser | undefined | null;
}

function Avatar({ user, ...rest }: AvatarProps) {
  return (
    <ChakraAvatar
      as={Link}
      to={`${ROUTES.PROTECTED}/profile/${user?.id}`}
      src={user?.avatar}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      {...rest}
    />
  );
}

export default Avatar;
