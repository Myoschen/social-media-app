import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collections } from "@/lib/firebase";
import { Comments } from "@/types";
import { useToast } from "@chakra-ui/react";

export function useQueryComments(pid: string) {
  const [comments, setComments] = useState<Comments>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collections.comment,
        where("pid", "==", pid),
        orderBy("createdAt", "asc")
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          setComments(snapshot.docs.map((doc) => ({ ...doc.data() })));
        } else {
          setComments([]);
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Failed to query comments",
          status: "error",
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, [pid]);

  return { comments, isLoading };
}
