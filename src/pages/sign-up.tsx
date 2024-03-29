import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignUp } from "@/lib/hooks/auth";
import { ROUTES } from "@/lib/routes";
import { SignUpInput, SignUpSchema } from "@/lib/form-schema";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
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
          <Input
            colorScheme="blue"
            type="text"
            placeholder="username"
            {...register("username")}
          />
          {errors.username ? (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.email} py="2">
          <FormLabel>Email</FormLabel>
          <Input
            colorScheme="blue"
            type="email"
            placeholder="user@email.com"
            {...register("email")}
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
            placeholder="password"
            {...register("password")}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} py="2">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            colorScheme="blue"
            type="password"
            placeholder="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <FormErrorMessage>
              {errors.confirmPassword.message}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <Button mt="4" type="submit" size="md" w="full" isLoading={loading}>
          Sign Up
        </Button>
      </form>
      <Text align="center" mt="6">
        Already have an account?&nbsp;
        <ChakraLink as={Link} to={ROUTES.LOGIN} color="blue.400">
          Log In
        </ChakraLink>
      </Text>
    </Box>
  );
}
