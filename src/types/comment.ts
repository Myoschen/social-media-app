import { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;
  pid: string;
  uid: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Comments = Array<Comment>;
