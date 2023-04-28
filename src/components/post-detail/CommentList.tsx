import { useQueryComments } from '@/hooks/comments';
import Comment from './Comment';

interface CommentListProps {
  postId: string;
}

function CommentList({ postId }: CommentListProps) {
  const { comments, isLoading } = useQueryComments(postId);

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentList;
