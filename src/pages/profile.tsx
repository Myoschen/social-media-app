import { useParams } from 'react-router-dom';
import PostList from '@/components/post/post-list';
import ProfileSection from '@/components/profile/profile-section';
import { useQueryPosts } from '@/hooks/post';
import { useQueryUser } from '@/hooks/user';
import { Box, Divider } from '@chakra-ui/react';

function ProfilePage() {
  const { id } = useParams() as { id: string };
  const { posts, isLoading: isPostLoading } = useQueryPosts(id);
  const { user, isLoading: isUserLoading } = useQueryUser(id);

  return (
    <Box>
      <ProfileSection
        user={user}
        postsLength={posts.length}
        isLoading={isUserLoading}
      />
      <Divider />
      <Box w="full" maxW="720" mx="auto">
        <PostList posts={posts} isLoading={isPostLoading} />
      </Box>
    </Box>
  );
}

export default ProfilePage;
