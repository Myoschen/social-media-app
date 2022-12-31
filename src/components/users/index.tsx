import { useQueryUsers } from 'hooks/user';
import { SimpleGrid, Text } from '@chakra-ui/react';
import User from './User';

function AllUsers() {
  const { users, isLoading } = useQueryUsers();

  if (isLoading) return <Text>Loading</Text>;

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {users?.map((user) => (
        <User key={user.id} isLoading={isLoading} user={user} />
      ))}
    </SimpleGrid>
  );
}

export default AllUsers;
