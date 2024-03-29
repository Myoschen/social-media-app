import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collections } from "@/lib/firebase";
import { Posts } from "@/types";
import { useToast } from "@chakra-ui/react";

export function useQueryPosts(uid?: string) {
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const q = uid
      ? query(
          collections.post,
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        )
      : query(collections.post, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
        } else {
          setPosts([]);
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Failed to query posts",
          status: "error",
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, [uid]);

  return { posts, isLoading };
}
