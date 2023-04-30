import { FirebaseError } from 'firebase/app';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { useToast } from '@chakra-ui/react';

function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const deleteComment = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(collections.comment, id));
      toast({
        title: 'Comment deleted successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Failed to delete comment',
          status: 'error',
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, isLoading };
}

export default useDeleteComment;
