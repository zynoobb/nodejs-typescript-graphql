import { gql } from "apollo-server";

const typeDefs = gql`
  type comment {
    id: String
    content: String
    createAt: String
    postId: Post
  }

  type Mutation {
    createComment(postId: String, content: String): comment
  }
`;

export default typeDefs;
