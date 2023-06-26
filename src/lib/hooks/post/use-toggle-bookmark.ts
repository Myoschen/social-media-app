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

export function useToggleBookmark(pid: Post["id"]) {
  const [isLoading, setLoading] = useState(false);
  const { user, dispatch } = useAuth() as {
    user: User;
    dispatch: Dispatch<AuthAction>;
  };
  const toast = useToast();

  const toggleBookmark = async () => {
    setLoading(true);
    try {
      const isBookmarked = user.bookmarks.includes(pid);
      const newBookmarks = isBookmarked
        ? user.bookmarks.filter((p) => p !== pid)
        : [...user.bookmarks, pid];
      await updateDoc(doc(collections.post, pid), {
        totalBookmarks: isBookmarked ? increment(-1) : increment(1),
      });
      await updateDoc(doc(collections.user, user.id), {
        bookmarks: isBookmarked ? arrayRemove(pid) : arrayUnion(pid),
      });
      dispatch({
        type: "UPDATE_AUTH",
        payload: { ...user, bookmarks: newBookmarks },
      });
      if (!isBookmarked) {
        toast({
          title: "You bookmarked this post",
          status: "info",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to save the post to bookmarks",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { toggleBookmark, isLoading };
}
