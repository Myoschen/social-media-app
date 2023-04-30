interface User {
  id: string;
  username: string;
  avatar: string;
  date: number;
}

type Users = Array<User>;

export type { User, Users };
