import '@fontsource/work-sans';
import '@fontsource/mulish';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/libs/routes';
import theme from '@/libs/theme';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
