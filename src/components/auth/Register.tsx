import { useRegister } from 'hooks/auth';
import { ROUTES } from 'lib/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouteLink } from 'react-router-dom';
import { RegisterSchema } from 'utils/form-validate';
import { InferType } from 'yup';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = InferType<typeof RegisterSchema>;

function Register() {
  const { register: signUp, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<FormValues> = async ({
    username,
    email,
    password,
  }) => {
    await signUp({ username, email, password });
  };

  return (
    <Center w="full" h="100vh">
      <Box mx="1" maxW="md" p="9">
        <Heading mb="4" size="xl" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="username"
              {...register('username')}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register('email')}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register('password')}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            Register
          </Button>
        </form>
        <Text align="center" mt="6">
          Already have an account?{' '}
          <Link
            as={RouteLink}
            to={ROUTES.LOGIN}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: 'teal.100' }}
          >
            Log In
          </Link>{' '}
          instead!
        </Text>
      </Box>
    </Center>
  );
}

export default Register;
