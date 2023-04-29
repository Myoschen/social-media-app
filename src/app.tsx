import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth';
import { router } from '@/libs/routes';
import theme from '@/libs/theme';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          isClosable: true,
          position: 'bottom-right',
          duration: 3000,
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
