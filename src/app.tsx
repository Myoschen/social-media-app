import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/store/auth";
import { router } from "@/lib/routes";
import { theme, toastOptions } from "@/lib/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

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
