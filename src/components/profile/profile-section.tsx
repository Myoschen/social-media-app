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
  user?: User;
  postsLength: number;
  isLoading: boolean;
}

function ProfileSection({ user, postsLength, isLoading }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    state: { user: auth },
  } = useAuth();

  if (isLoading) {
    return (
      <Box maxW="480" mx="auto" my="8">
        <SkeletonCircle size="16" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="3" />
      </Box>
    );
  }

  return (
    <Flex p={['4', '6']} pos="relative" align="center" justify="center">
      <Avatar user={user} size="xl" />
      <Stack direction="column" ml="10">
        <HStack>
          <Text fontSize="2xl">{user?.username}</Text>
          {auth?.id === user?.id ? (
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
              {postsLength}
            </Text>
          </Flex>
          <Flex align="center" gap="2">
            <Tag colorScheme="blue">Likes</Tag>
            <Text color="gray.600" fontSize={['xs', 'md']}>
              {10}
            </Text>
          </Flex>
          <Flex align="center" gap="2">
            <Tag colorScheme="blue">Joined</Tag>
            <Text whiteSpace="nowrap" color="gray.600" fontSize={['xs', 'md']}>
              {format(user?.date!, 'MMMM yyyy')}
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <EditModal user={user} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default ProfileSection;
