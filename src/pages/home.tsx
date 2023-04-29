import { NewPost, PostList } from '@/components/post';
import { useQueryPosts } from '@/hooks/post';

function HomePage() {
  const { posts, isLoading } = useQueryPosts();

  if (isLoading) return <span>Loading</span>;

  return (
    <>
      <NewPost />
      <PostList posts={posts} />
    </>
  );
}

export default HomePage;
