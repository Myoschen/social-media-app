import { useQueryComments } from '@/hooks/comment';
import CommentBlock from './comment-block';

interface Props {
  postId: string;
}

function CommentList({ postId }: Props) {
  const { comments, isLoading } = useQueryComments(postId);

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      {comments?.map((comment) => (
        <CommentBlock key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentList;
