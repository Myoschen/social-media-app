import { useQueryPosts } from 'hooks/posts';
import NewPost from './NewPost';
import PostList from './PostList';

function Dashboard() {
  const { posts, isLoading } = useQueryPosts();

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      <NewPost />
      <PostList posts={posts} />
    </>
  );
}

export default Dashboard;
