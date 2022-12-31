import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { commentCol, postCol } from 'lib/firebase';
import { IPost } from 'lib/types';
import { useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { ROUTES } from 'lib/routes';

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async (post: Partial<IPost>) => {
    setLoading(true);
    const id = uuid();
    const docRef = doc(postCol, id);
    await setDoc(docRef, {
      ...post,
      id,
      date: Date.now(),
      likes: [] as string[],
    });
    toast({
      title: 'Post added successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
    setLoading(false);
  };

  return { addPost, isLoading };
}

export function useQueryPosts(uid?: string) {
  const q = uid
    ? query(postCol, where('uid', '==', uid), orderBy('date', 'desc'))
    : query(postCol, orderBy('date', 'desc'));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike({
  id,
  isLiked,
  uid,
}: Pick<IPost, 'id' | 'uid'> & { isLiked: boolean }) {
  const [isLoading, setLoading] = useState(false);

  const toggleLike = async () => {
    setLoading(true);
    const docRef = doc(postCol, id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  };

  return { toggleLike, isLoading };
}

export function useQueryPost(id: string) {
  const docRef = doc(postCol, id);
  const [post, isLoading, error] = useDocumentData(docRef);
  if (error) throw error;
  return { post, isLoading };
}

export function useDeletePost(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const deletePost = async () => {
    if (location.pathname.startsWith(`${ROUTES.PROTECTED}/posts`)) {
      navigate(ROUTES.DASHBOARD);
    }

    setLoading(true);

    // Delete post document
    const docRef = doc(postCol, id);
    await deleteDoc(docRef);

    // Delete comments
    const q = query(commentCol, where('postId', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => await deleteDoc(doc.ref));

    toast({
      title: 'Post added successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });
    setLoading(false);
  };

  return { deletePost, isLoading };
}
