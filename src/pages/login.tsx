import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/auth';
import { ROUTES } from '@/libs/routes';
import { LoginInput, LoginSchema } from '@/utils/form-schema';
import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link as ChakraLink, Text
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginPage() {
  const { login, loading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginInput> = async ({ email, password }) => {
    await login({ email, password });
  };

  return (
    <Box w="full" maxW="md" p="8">
      <Heading mb="4" size="xl" textAlign="center">
        Log In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} py="2">
          <FormLabel>Email</FormLabel>
          <Input
            colorScheme="blue"
            type="email"
            placeholder="your email..."
            {...register('email')}
          />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.password} py="2">
          <FormLabel>Password</FormLabel>
          <Input
            colorScheme="blue"
            type="password"
            placeholder="password..."
            {...register('password')}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button mt="4" type="submit" size="md" w="full" isLoading={loading}>
          Log In
        </Button>
      </form>
      <Text align="center" mt="6">
        Don't have an account?&nbsp;
        <ChakraLink as={Link} to={ROUTES.SIGNUP} color="blue.400">
          Sign Up
        </ChakraLink>
      </Text>
    </Box>
  );
}

export default LoginPage;
