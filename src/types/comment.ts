interface Comment {
  id: string;
  uid: string;
  postId: string;
  text: string;
  date: number;
}

type Comments = Array<Comment>;

export type { Comment, Comments };
