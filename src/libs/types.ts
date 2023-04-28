export interface IUser {
  id: string;
  username: string;
  avatar: string;
  date: number;
}

export interface IPost {
  id: string;
  uid: string;
  text: string;
  likes: string[];
  date: number;
}

export interface IComment {
  id: string;
  uid: string;
  postId: string;
  text: string;
  date: number;
}
