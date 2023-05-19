import { gql } from "apollo-server";
import database from "../config";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    createAt: String!
  }

  type Query {
    fetchUsers: [User]
    fetchUser(id: String): User
  }
`;

export default typeDefs;
