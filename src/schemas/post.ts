import { gql } from "apollo-server";
import commentTypeDefs from "./comment";

const typeDefs = gql`
  scalar DateTime
  type Post {
    id: String
    title: String
    content: String
    createAt: DateTime
    authorId: String
    user: User
    comments: [comment]
  }

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

  # 코멘트 type을 가져오기 위한 리터럴
  ${commentTypeDefs}
`;

export default typeDefs;
