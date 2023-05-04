import { FirebaseError } from 'firebase/app';
import { arrayRemove, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collections } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { useToast } from '@chakra-ui/react';

function useDeletePost(pid: string) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const deletePost = async () => {
    setLoading(true);
    try {
      // delete post
      await deleteDoc(doc(collections.post, pid));

      // delete all comments of the post
      const commentsSnapshot = await getDocs(
        query(collections.comment, where('pid', '==', pid))
      );
      commentsSnapshot.forEach(async (doc) => await deleteDoc(doc.ref));

      // delete pid from user likes, bookmarks
      const usersSnapshot = await getDocs(query(collections.user));
      usersSnapshot.forEach(
        async (doc) =>
          await updateDoc(doc.ref, {
            likes: arrayRemove(pid),
            bookmarks: arrayRemove(pid),
          })
      );

      // navigate to home page
      navigate(ROUTES.HOME);
      toast({
        title: 'Post deleted successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Failed to delete post',
          status: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, isLoading };
}

export default useDeletePost;
