import { FirebaseError } from 'firebase/app';
import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Comment } from '@/types';
import { useToast } from '@chakra-ui/react';

function useDeleteComment() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const deleteComment = async (comment: Comment) => {
    setLoading(true);
    try {
      await deleteDoc(doc(collections.comment, comment.id));
      await updateDoc(doc(collections.post, comment.pid), {
        totalComments: increment(-1),
      });
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
