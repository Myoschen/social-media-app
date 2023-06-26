import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/hooks/auth";
import { ROUTES } from "@/lib/routes";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../sidebar";

export default function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    <Flex minH="100vh">
      <Sidebar />
      <Box as="main" w="calc(100% - 280px)" ml="auto" py="8">
        <Outlet />
      </Box>
    </Flex>
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  );
}
