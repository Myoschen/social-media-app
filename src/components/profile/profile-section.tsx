import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/hooks/auth';
import { User } from '@/types';
import {
    Box, Flex, HStack, IconButton, SkeletonCircle, SkeletonText, Stack, Tag, Text, useDisclosure
} from '@chakra-ui/react';
import EditModal from './edit-modal';

interface Props {
  user: User;
  totalPost: number;
  isLoading: boolean;
}

function ProfileSection({ user, totalPost, isLoading }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user: authUser } = useAuth();

  if (isLoading) {
    return (
      <Box maxW="480" mx="auto" my="8">
        <SkeletonCircle size="16" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="3" />
      </Box>
    );
  }

  return (
    <Box w="full" maxW="720px" mx="auto" pb="10" px="4">
      <Flex align="center">
        <Avatar id={user.id} avatar={user.avatar} size="xl" />
        <Stack direction="column" ml="10">
          <HStack>
            <Text fontSize="2xl">{user?.username}</Text>
            {authUser?.id === user?.id ? (
              <IconButton
                icon={<FaEdit />}
                isRound
                size="xs"
                variant="ghost"
                onClick={onOpen}
                aria-label="edit profile"
              />
            ) : null}
          </HStack>
          <Stack gap={{ md: '4' }} direction={{ base: 'column', md: 'row' }}>
            <Flex align="center" gap="2">
              <Tag colorScheme="blue">Post</Tag>
              <Text color="gray.600" fontSize={['xs', 'md']}>
                {totalPost}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Tag colorScheme="blue">Likes</Tag>
              <Text color="gray.600" fontSize={['xs', 'md']}>
                {user.likes.length}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Tag colorScheme="blue">Bookmarks</Tag>
              <Text color="gray.600" fontSize={['xs', 'md']}>
                {user.bookmarks.length}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Tag colorScheme="blue">Joined</Tag>
              <Text
                whiteSpace="nowrap"
                color="gray.600"
                fontSize={['xs', 'md']}
              >
                {format(user?.createdAt.toDate() as Date, 'MMMM yyyy')}
              </Text>
            </Flex>
          </Stack>
        </Stack>
        <EditModal user={authUser!} isOpen={isOpen} onClose={onClose} />
      </Flex>
      {user?.bio ? (
        <Text mt="4" fontSize="lg">
          {user.bio}
        </Text>
      ) : null}
    </Box>
  );
}

export default ProfileSection;
