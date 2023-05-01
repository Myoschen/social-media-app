import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouteLink } from 'react-router-dom';
import { useSignUp } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { SignUpInput, SignUpSchema } from '@/utils/form-schema';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

function SignUpPage() {
  const { signUp, loading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpInput> = async ({
    username,
    email,
    password,
  }) => {
    await signUp({ username, email, password });
  };

  return (
    <Box w="full" maxW="md" p="8">
      <Heading mb="4" size="xl" textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username} py="2">
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="username" {...register('username')} />
          {errors.username ? (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.email} py="2">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="user@email.com"
            {...register('email')}
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.password} py="2">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} py="2">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <FormErrorMessage>
              {errors.confirmPassword.message}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <Button
          mt="4"
          type="submit"
          colorScheme="teal"
          size="md"
          w="full"
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>
      <Text align="center" mt="6">
        Already have an account?&nbsp;
        <Link
          as={RouteLink}
          to={ROUTES.LOGIN}
          color="teal.800"
          fontWeight="medium"
        >
          Log In
        </Link>
      </Text>
    </Box>
  );
}

export default SignUpPage;
