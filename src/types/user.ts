import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  likes: string[];
  bookmarks: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Users = Array<User>;
