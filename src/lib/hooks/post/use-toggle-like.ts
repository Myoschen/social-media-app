import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { Dispatch, useState } from "react";
import { AuthAction } from "@/store/auth";
import { collections } from "@/lib/firebase";
import { Post, User } from "@/types";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../auth";

export function useToggleLikePost(pid: Post["id"]) {
  const [isLoading, setLoading] = useState(false);
  const { user, dispatch } = useAuth() as {
    user: User;
    dispatch: Dispatch<AuthAction>;
  };
  const toast = useToast();

  const toggleLike = async () => {
    setLoading(true);
    try {
      const isLiked = user.likes.includes(pid);
      const newLikes = isLiked
        ? user.likes.filter((p) => p !== pid)
        : [...user.likes, pid];
      await updateDoc(doc(collections.post, pid), {
        totalLikes: isLiked ? increment(-1) : increment(1),
      });
      await updateDoc(doc(collections.user, user.id), {
        likes: isLiked ? arrayRemove(pid) : arrayUnion(pid),
      });
      dispatch({ type: "UPDATE_AUTH", payload: { ...user, likes: newLikes } });
      if (!isLiked) {
        toast({
          title: "You like this post",
          status: "info",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to give this post a like",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, isLoading };
}
