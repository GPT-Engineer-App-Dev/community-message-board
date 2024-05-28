import { Box, Container, VStack, Text, Input, Button, HStack, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { usePosts, useAddPost } from "../integrations/supabase/index.js";

const Index = () => {
  const [newPost, setNewPost] = useState("");

  const { data: posts, isLoading, isError, error } = usePosts();
  const addPostMutation = useAddPost();

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      addPostMutation.mutate({ title: newPost, body: newPost, author_id: "user-id-placeholder" });
      setNewPost("");
    }
  };

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center" bg="blue.500" p={4} borderRadius="md" color="white">
          <Heading size="lg">Public Post Board</Heading>
        </Flex>

        <Box bg="gray.100" p={4} borderRadius="md">
          <HStack>
            <Input
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              bg="white"
            />
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handlePostSubmit} isLoading={addPostMutation.isLoading}>
              Post
            </Button>
          </HStack>
        </Box>

        <VStack spacing={4} align="stretch">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <Text>Error: {error.message}</Text>
          ) : posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post) => (
              <Box key={post.id} bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text>{post.title}</Text>
              </Box>
            ))
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;