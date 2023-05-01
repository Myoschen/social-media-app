import { RxExit, RxHamburgerMenu, RxMoon, RxSun } from 'react-icons/rx';
import { useLogout } from '@/hooks/auth';
import { Nullable, User } from '@/types';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { Avatar, UserLink } from '../ui';

interface Props {
  user: Nullable<User>;
}

function UserBox({ user }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, loading } = useLogout();

  return (
    <Flex py="2" justifyContent="space-between" alignItems="center">
      <Flex gap="4" alignItems="center">
        <Avatar user={user} size="sm" />
        <UserLink user={user} />
      </Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="options"
          icon={<RxHamburgerMenu />}
          variant="ghost"
          size="sm"
          sx={{ cursor: 'default' }}
        />
        <MenuList>
          <MenuItem
            icon={colorMode === 'light' ? <RxMoon /> : <RxSun />}
            onClick={toggleColorMode}
          >
            Dark mode
          </MenuItem>
          <MenuItem icon={<RxExit />} onClick={logout} isDisabled={loading}>
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
export default UserBox;
