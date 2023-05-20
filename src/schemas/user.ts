import { gql } from "apollo-server";
import postTypeDefs from "./post";

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    createAt: String
    posts: [Post]
  }

  ${postTypeDefs}

  type Query {
    fetchUsers: [User]
    fetchUser(id: String): User
  }

  type Mutation {
    createUser(createUserInput: createUserInput): User
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
