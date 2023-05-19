import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/graphql");
  });
};

startServer();
