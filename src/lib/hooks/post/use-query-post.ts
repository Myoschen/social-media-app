import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collections } from "@/lib/firebase";
import { Post } from "@/types";
import { useToast } from "@chakra-ui/react";

export function useQueryPost(id: string) {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collections.post, id),
      (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Failed to query post",
          status: "error",
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, [id]);

  return { post, isLoading };
}
