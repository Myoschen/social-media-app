interface Post {
  id: string;
  uid: string;
  text: string;
  likes: string[];
  date: number;
}

type Posts = Array<Post>;

export type { Post, Posts };
