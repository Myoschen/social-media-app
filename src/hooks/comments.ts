import {
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { commentCol } from '../libs/firebase';
import { IComment } from '../libs/types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    const id = uuid();
    const docRef = doc(commentCol, id);
    await setDoc(docRef, {
      id,
      uid,
      postId,
      text,
      date: Date.now(),
    });
    toast({
      title: 'Comment added successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
    setLoading(false);
  };

  return { addComment, isLoading };
}

export function useQueryComments(postId: string) {
  const q = query(
    commentCol,
    where('postId', '==', postId),
    orderBy('date', 'asc')
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { comments, isLoading };
}

export function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const deleteComment = async () => {
    setLoading(true);
    const docRef = doc(commentCol, id);
    await deleteDoc(docRef);
    toast({
      title: 'Comment deleted successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
    setLoading(false);
  };

  return { deleteComment, isLoading };
}
