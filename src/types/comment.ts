import { Timestamp } from 'firebase/firestore';

interface Comment {
  id: string;
  pid: string;
  uid: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type Comments = Array<Comment>;

export type { Comment, Comments };
