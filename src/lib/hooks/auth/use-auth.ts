import { useContext } from "react";
import { User } from "@/types";
import { AuthCtx } from "@/store/auth";

export function useAuth() {
  const context = useContext(AuthCtx);

  if (!context) {
    throw new Error("The useAuth hook must be used in the AuthProvider.");
  }

  return context;
}

// https://stackoverflow.com/questions/67785257/best-practice-when-asserting-non-null-on-a-value-coming-from-react-usecontext-o
export function assertAuthenticated(
  user: ReturnType<typeof useAuth>["user"]
): asserts user is User {
  if (!user) {
    throw new Error("User is not authenticated, please log in!");
  }
}
