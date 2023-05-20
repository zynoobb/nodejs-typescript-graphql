import { gql } from "apollo-server";

const typeDefs = gql`
  scalar DateTime

  type comment {
    id: String
    content: String
    createAt: DateTime
    postId: Post
  }

  type Mutation {
    createComment(postId: String, content: String): comment
  }
`;

export default typeDefs;
