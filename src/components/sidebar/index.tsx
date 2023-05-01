import { useMemo } from 'react';
import { RxAvatar, RxBell, RxBookmark, RxHome } from 'react-icons/rx';
import { useAuth } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { Box, Flex, List, useColorModeValue } from '@chakra-ui/react';
import Logo from './logo';
import NavLink from './nav-link';
import UserBox from './user-box';

function Sidebar() {
  const borderColor = useColorModeValue('gray.50', 'gray.800');
  const {
    state: { user },
  } = useAuth();

  const navLinks = useMemo(
    () => [
      {
        icon: <RxHome />,
        text: 'Home',
        to: ROUTES.HOME,
      },
      {
        icon: <RxBell />,
        text: 'Notifications',
        to: ROUTES.HOME,
      },
      {
        icon: <RxBookmark />,
        text: 'Saves',
        to: ROUTES.HOME,
      },
      {
        icon: <RxAvatar />,
        text: 'Profile',
        to: `${ROUTES.USERS}/${user?.id}`,
      },
    ],
    [user]
  );

  return (
    <Flex
      as="aside"
      pos="fixed"
      w="full"
      h="100vh"
      maxW="280px"
      direction="column"
      borderRightWidth="1px"
      borderColor={borderColor}
    >
      <Flex
        px="4"
        py="3"
        h="100%"
        direction="column"
        justifyContent="start"
        alignItems="stretch"
      >
        <Logo text="Social Media" to={ROUTES.HOME} />
        {/* nav */}
        <Box as="nav" flexGrow="1">
          <List>
            {navLinks.map(({ icon, text, to }, i) => (
              <NavLink key={to + i} icon={icon} text={text} to={to} />
            ))}
          </List>
        </Box>

        <UserBox user={user} />
      </Flex>
    </Flex>
  );
}

export default Sidebar;
