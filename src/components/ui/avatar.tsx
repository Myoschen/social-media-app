import { Link } from 'react-router-dom';
import { ROUTES } from '@/libs/routes';
import { User } from '@/types';
import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';

interface AvatarProps extends ChakraAvatarProps {
  id: User['id'];
  avatar: User['avatar'];
}

function Avatar({ id, avatar, ...rest }: AvatarProps) {
  return (
    <ChakraAvatar
      as={Link}
      src={avatar}
      to={`${ROUTES.USERS}/${id}`}
      _hover={{ opacity: 0.8 }}
      {...rest}
    />
  );
}

export default Avatar;
