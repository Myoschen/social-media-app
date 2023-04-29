import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import PostList from '@/components/post/post-list';
import { EditModal } from '@/components/profile';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { useQueryPosts } from '@/hooks/post';
import { useQueryUser } from '@/hooks/user';
import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

function ProfilePage() {
  const { id } = useParams() as { id: string };
  const {
    state: { user: authUser },
  } = useAuth();
  const { posts, isLoading: postsLoading } = useQueryPosts(id);
  const { user, isLoading: userLoading } = useQueryUser(id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (userLoading || postsLoading) return <Text>Loading</Text>;

  return (
    <Stack spacing="5">
      <Flex p={['4', '6']} pos="relative" align="center" mx="auto">
        <Avatar user={user} size="xl" />
        <Stack direction="column" ml="10">
          <HStack>
            <Text fontSize="2xl">{user?.username}</Text>
            {authUser?.id === id && (
              <IconButton
                icon={<FaEdit />}
                size="xs"
                variant="ghost"
                colorScheme="teal"
                isRound
                aria-label="edit profile"
                onClick={onOpen}
              />
            )}
          </HStack>
          <Stack gap={{ md: '4' }} direction={{ base: 'column', md: 'row' }}>
            <Flex align="center" gap="2">
              <Tag colorScheme="teal">Post</Tag>
              <Text color="gray.700" fontSize={['xs', 'md']}>
                {posts?.length}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Tag colorScheme="teal">Likes</Tag>
              <Text color="gray.700" fontSize={['xs', 'md']}>
                {10}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Tag colorScheme="teal">Joined</Tag>
              <Text
                whiteSpace="nowrap"
                color="gray.700"
                fontSize={['xs', 'md']}
              >
                {format(user?.date!, 'MMMM yyyy')}
              </Text>
            </Flex>
          </Stack>
        </Stack>
        <EditModal user={user} isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />
      <PostList posts={posts} />
    </Stack>
  );
}

export default ProfilePage;
