import { useQueryComments } from "@/lib/hooks/comment";
import CommentBlock from "./comment-block";

interface Props {
  pid: string;
}

export default function CommentList({ pid }: Props) {
  const { comments, isLoading } = useQueryComments(pid);

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      {comments?.map((comment) => (
        <CommentBlock key={comment.id} comment={comment} />
      ))}
    </>
  );
}
