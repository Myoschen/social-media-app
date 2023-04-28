import { useUpdateProfile } from '@/hooks/user';
import { IUser } from '../../libs/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProfileSchema } from '@/utils/form-validate';
import { InferType } from 'yup';
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProfileProps {
  user?: IUser;
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = InferType<typeof ProfileSchema>;

function EditProfile({ user, isOpen, onClose }: EditProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      username: user?.username,
    },
  });
  const { updateProfile, setFile, isLoading, fileURL } = useUpdateProfile(
    user?.id!,
    user?.avatar!
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateProfile(data.username);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
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
                  type="text"
                  placeholder="Username"
                  {...register('username')}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Button
              type="submit"
              w="full"
              my="6"
              colorScheme="teal"
              isLoading={isLoading}
            >
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
