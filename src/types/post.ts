import { Timestamp } from 'firebase/firestore';

interface Post {
  id: string;
  uid: string;
  content: string;
  totalLikes: number;
  totalBookmarks: number;
  totalComments: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type Posts = Array<Post>;

export type { Post, Posts };
