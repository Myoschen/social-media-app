import { onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collections } from "@/lib/firebase";
import { Users } from "@/types";
import { useToast } from "@chakra-ui/react";

function useQueryUsers() {
  const [users, setUsers] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collections.user),
      (snapshot) => {
        if (!snapshot.empty) {
          setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));
        } else {
          setUsers([]);
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Failed to query users",
          status: "error",
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, []);

  return { users, isLoading };
}

export default useQueryUsers;
