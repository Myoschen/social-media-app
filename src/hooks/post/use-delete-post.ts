import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { commentCol, postCol } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { useToast } from '@chakra-ui/react';

function useDeletePost(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const deletePost = async () => {
    if (location.pathname.startsWith(`${ROUTES.AUTHORIZED}/posts`)) {
      navigate(ROUTES.DASHBOARD);
    }

    setLoading(true);

    const docRef = doc(postCol, id);
    await deleteDoc(docRef);

    const q = query(commentCol, where('postId', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => await deleteDoc(doc.ref));

    toast({
      title: 'Post delete successfully',
      status: 'success',
    });
    setLoading(false);
  };

  return { deletePost, isLoading };
}

export default useDeletePost;
