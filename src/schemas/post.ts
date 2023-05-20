import { gql } from "apollo-server";
import commentTypeDefs from "./comment";

const typeDefs = gql`
  type Post {
    id: String
    title: String
    content: String
    createAt: String
    authorId: User!
    comments: [comment]
  }

  ${commentTypeDefs}

  type Query {
    fetchPosts: [Post]
    fetchPost(postId: String): Post
  }

  type Mutation {
    createPost(authorId: String, createPostInput: createPostInput): Post
  }

  input createPostInput {
    title: String
    content: String
  }
`;

export default typeDefs;
