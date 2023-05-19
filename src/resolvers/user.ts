import database from "../config";

const resolvers = {
  Query: {
    fetchUsers: (parent, args) => database.user.findMany(),
    fetchUser: (parent, args) =>
      database.user.findUnique({ where: { id: args.id } }),
  },
};

export default resolvers;
