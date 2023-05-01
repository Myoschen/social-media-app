import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth';
import { router } from '@/libs/routes';
import { theme, toastOptions } from '@/theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={toastOptions}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  );
}

export default App;
