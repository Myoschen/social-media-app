import { useParams } from "react-router-dom";
import PostList from "@/components/post/post-list";
import ProfileSection from "@/components/profile/profile-section";
import { FullLoading } from "@/components/ui";
import { useQueryPosts } from "@/lib/hooks/post";
import { useQueryUser } from "@/lib/hooks/user";
import { Box, Divider } from "@chakra-ui/react";

export default function ProfilePage() {
  const { id } = useParams() as { id: string };
  const { posts, isLoading: isPostLoading } = useQueryPosts(id);
  const { user, isLoading: isUserLoading } = useQueryUser(id);

  if (isUserLoading || isPostLoading) {
    return <FullLoading />;
  }

  if (!user) {
    throw new Error("User not found!");
  }

  return (
    <Box>
      <ProfileSection
        user={user}
        totalPost={posts.length}
        isLoading={isUserLoading}
      />
      <Divider />
      <Box w="full" maxW="720px" mx="auto">
        <PostList posts={posts} isLoading={isPostLoading} />
      </Box>
    </Box>
  );
}
