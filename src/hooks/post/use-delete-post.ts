import { FirebaseError } from 'firebase/app';
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collections } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { useToast } from '@chakra-ui/react';

function useDeletePost(id: string) {
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const deletePost = async () => {
    setLoading(true);
    try {
      // navigate to dashboard
      if (location.pathname.startsWith(`${ROUTES.AUTHORIZED}/posts`)) {
        navigate(ROUTES.DASHBOARD);
      }

      // delete post
      await deleteDoc(doc(collections.post, id));

      // delete all comments of the post
      const commentSnapshot = await getDocs(
        query(collections.comment, where('postId', '==', id))
      );
      commentSnapshot.forEach(async (doc) => await deleteDoc(doc.ref));

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
