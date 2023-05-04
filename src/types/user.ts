import { Timestamp } from 'firebase/firestore';

interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  likes: string[];
  bookmarks: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type Users = Array<User>;

export type { User, Users };
