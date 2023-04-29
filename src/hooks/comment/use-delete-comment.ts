import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { commentCol } from '@/libs/firebase';
import { useToast } from '@chakra-ui/react';

function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const deleteComment = async () => {
    setLoading(true);
    const docRef = doc(commentCol, id);
    await deleteDoc(docRef);
    toast({
      title: 'Comment deleted successfully',
      status: 'success',
    });
    setLoading(false);
  };

  return { deleteComment, isLoading };
}

export default useDeleteComment;
