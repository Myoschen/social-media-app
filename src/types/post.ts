import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  uid: string;
  content: string;
  totalLikes: number;
  totalBookmarks: number;
  totalComments: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Posts = Array<Post>;
