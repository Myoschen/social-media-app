import { Link } from 'react-router-dom';
import { Box, Heading, Link as ChakraLink } from '@chakra-ui/react';

interface Props {
  to: string;
  text: string;
}

function Logo({ to, text }: Props) {
  return (
    <Box w="fit-content" pt="8" pb="4" mb="4">
      <ChakraLink as={Link} to={to} style={{ textDecoration: 'none' }}>
        <Heading as="h1" fontSize="2xl" fontWeight="semibold">
          {text}
        </Heading>
      </ChakraLink>
    </Box>
  );
}

export default Logo;
