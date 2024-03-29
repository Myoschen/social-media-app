import { RxDotsHorizontal, RxExit, RxMoon, RxSun } from "react-icons/rx";
import { useLogout } from "@/lib/hooks/auth";
import { User } from "@/types";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { Avatar, UserLink } from "../ui";

interface Props {
  user: User;
}

export default function UserBox({ user }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, loading } = useLogout();

  return (
    <Flex py="2" justifyContent="space-between" alignItems="center">
      <Flex gap="4" alignItems="center">
        <Avatar id={user.id} avatar={user.avatar} size="sm" />
        <UserLink id={user.id} username={user.username} />
      </Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="options"
          icon={<RxDotsHorizontal />}
          variant="ghost"
          size="sm"
          sx={{ cursor: "default" }}
        />
        <MenuList>
          <MenuItem
            icon={colorMode === "light" ? <RxMoon /> : <RxSun />}
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
