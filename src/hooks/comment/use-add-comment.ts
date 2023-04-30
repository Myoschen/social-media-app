import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { commentCol } from '@/libs/firebase';
import { useToast } from '@chakra-ui/react';

export function useAddComment({
  postId,
  uid,
}: {
  postId: string;
  uid: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addComment = async (text: string) => {
    setLoading(true);
    const id = nanoid();
    const docRef = doc(commentCol, id);
    await setDoc(docRef, {
      id,
      uid,
      postId,
      text,
      date: Date.now(),
    });
    toast({
      title: 'Comment added successfully',
      status: 'success',
    });
    setLoading(false);
  };

  return { addComment, isLoading };
}

export default useAddComment;
