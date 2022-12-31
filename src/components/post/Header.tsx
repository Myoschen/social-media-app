import Avatar from 'components/common/Avatar';
import UsernameLink from 'components/common/UsernameLink';
import { formatDistanceToNow } from 'date-fns';
import { useQueryUser } from 'hooks/user';
import { Box, Flex, Text } from '@chakra-ui/react';

interface HeaderProps {
  uid: string;
  date: number;
}

function Header({ uid, date }: HeaderProps) {
  const { user, isLoading } = useQueryUser(uid);

  if (isLoading) return <span>Loading</span>;

  return (
    <Flex
      align="center"
      borderBottom="1px solid"
      borderColor="gray.200"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="sm" />
      <Box ml="2">
        <UsernameLink user={user} />
        <Text fontSize="sm" color="gray.500">
          {formatDistanceToNow(date)} ago
        </Text>
      </Box>
    </Flex>
  );
}

export default Header;
