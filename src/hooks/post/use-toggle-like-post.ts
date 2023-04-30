import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Post } from '@/types';
import { useToast } from '@chakra-ui/react';

type HookParams = Pick<Post, 'id' | 'uid'> & { isLiked: boolean };

function useToggleLikePost({ id, isLiked, uid }: HookParams) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const toggleLike = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(collections.post, id), {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
      if (!isLiked) {
        // TODO change the icon to heart or thumbs-up
        toast({
          title: 'You like this post',
          status: 'info',
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to give this post a like',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, isLoading };
}

export default useToggleLikePost;
