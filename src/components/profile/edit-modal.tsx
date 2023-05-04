import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useUpdateProfile } from '@/hooks/user';
import { User } from '@/types';
import { ProfileInput, ProfileSchema } from '@/utils/form-schema';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}

function EditModal({ user, isOpen, onClose }: Props) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: user?.username,
      bio: user?.bio,
    },
  });
  const { updateProfile, setFile, isLoading, fileURL } = useUpdateProfile(
    user?.id!,
    user?.avatar!
  );

  const onSubmit: SubmitHandler<ProfileInput> = async ({ username, bio }) => {
    await updateProfile(username, bio);
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent sx={{ bgColor }}>
        <ModalHeader fontWeight="semibold">Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Flex align="end">
                <Avatar src={fileURL} size="xl" />
                <FormControl>
                  <Button
                    size="xs"
                    variant="ghost"
                    type="button"
                    onClick={() => uploadRef.current?.click()}
                  >
                    Change Avatar
                  </Button>
                  <Input
                    ref={uploadRef}
                    id="upload-img"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      }
                    }}
                    sx={{ display: 'none' }}
                  />
                </FormControl>
              </Flex>
            </FormControl>
            <Box mt="4" display="grid" gap="2">
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="username"
                  colorScheme="blue"
                  {...register('username')}
                />
                {errors.username ? (
                  <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.bio}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  as={TextareaAutosize}
                  minH="120"
                  resize="none"
                  placeholder="bio"
                  {...register('bio')}
                />
                {errors.bio ? (
                  <FormErrorMessage>{errors.bio.message}</FormErrorMessage>
                ) : null}
              </FormControl>

              <HStack my="4">
                <Button
                  w="full"
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  w="full"
                  size="sm"
                  variant="outline"
                  type="submit"
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </HStack>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
