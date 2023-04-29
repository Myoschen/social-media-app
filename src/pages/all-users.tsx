import { useQueryUsers } from '@/hooks/user';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { UserCard } from '@/components/user';

function AllUsersPage() {
  const { users, isLoading } = useQueryUsers();

  if (isLoading) return <Text>Loading</Text>;

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
}

export default AllUsersPage;
