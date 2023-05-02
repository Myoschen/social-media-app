import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/user';
import { User } from '@/types';
import { ProfileInput, ProfileSchema } from '@/utils/form-schema';
import {
    Avatar, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useColorModeValue
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}

function EditModal({ user, isOpen, onClose }: Props) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: user?.username,
    },
  });
  const { updateProfile, setFile, isLoading, fileURL } = useUpdateProfile(
    user?.id!,
    user?.avatar!
  );

  const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
    await updateProfile(data.username);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent sx={{ bgColor }}>
        <ModalHeader fontWeight="semibold">Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <Flex align="end">
                  <Avatar src={fileURL} size="xl" />
                  <FormControl>
                    <Input
                      variant="unstyled"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                </Flex>
              </FormControl>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  colorScheme="blue"
                  type="text"
                  placeholder="Username"
                  {...register('username')}
                />
                {errors.username ? (
                  <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                ) : null}
              </FormControl>
            </Stack>
            <Button w="full" my="6" type="submit" isLoading={isLoading}>
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
