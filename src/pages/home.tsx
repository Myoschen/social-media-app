import { NewPost, PostList } from '@/components/post';
import { useQueryPosts } from '@/hooks/post';

function HomePage() {
  const { posts, isLoading } = useQueryPosts();
  return (
    <>
      <NewPost />
      <PostList posts={posts} isLoading={isLoading} />
    </>
  );
}

export default HomePage;
