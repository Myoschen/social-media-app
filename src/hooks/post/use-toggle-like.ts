import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { postCol } from '@/libs/firebase';
import { Post } from '@/types';

function useToggleLike({
  id,
  isLiked,
  uid,
}: Pick<Post, 'id' | 'uid'> & { isLiked: boolean }) {
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

export default useToggleLike;
