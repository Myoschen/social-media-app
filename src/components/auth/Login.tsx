import { useLogin } from '@/hooks/auth';
import { ROUTES } from '../../libs/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouteLink } from 'react-router-dom';
import { LoginSchema } from '@/utils/form-validate';
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

type FormValues = InferType<typeof LoginSchema>;

function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(LoginSchema) });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const isSuccess = await login({ email, password });
    if (isSuccess) reset();
  };

  return (
    <Center w="full" h="100vh">
      <Box mx="1" maxW="md" p="9">
        <Heading mb="4" size="xl" textAlign="center">
          Log In
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>
        <Text align="center" mt="6">
          Don't have an account?{' '}
          <Link
            as={RouteLink}
            to={ROUTES.REGISTER}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: 'teal.100' }}
          >
            Register
          </Link>{' '}
          instead!
        </Text>
      </Box>
    </Center>
  );
}

export default Login;
