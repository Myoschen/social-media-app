import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { User } from "@/types";
import { Link as ChakraLink } from "@chakra-ui/react";

interface Props {
  id: User["id"];
  username: User["username"];
}

export default function UserLink({ id, username }: Props) {
  return (
    <ChakraLink as={Link} to={`${ROUTES.USERS}/${id}`} fontWeight="medium">
      {username}
    </ChakraLink>
  );
}
