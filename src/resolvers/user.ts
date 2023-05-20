import { User } from "@prisma/client";
import database from "../config";
import { createUserInput } from "./interfaces/user/user-service.interface";
import { UserService } from "./services/user";

class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // 더 깔끔하게 하는 방법이 있을까 고민하기
  async createUser(
    _,
    { createUserInput }: { createUserInput: createUserInput }
  ): Promise<User> {
    try {
      return this.userService.createUser(createUserInput);
    } catch (error) {
      throw new Error(error);
    }
  }

  fetchUsers(_, args) {
    return database.user.findMany();
  }

  fetchUser(_, args) {
    return database.user.findUnique({ where: { id: args.id } });
  }
}
const userResolver = new UserResolver();

const resolvers = {
  Query: {
    fetchUsers: (_, args) => userResolver.fetchUsers(_, args),
    fetchUser: (_, args) => userResolver.fetchUser(_, args),
  },
  Mutation: {
    createUser: (_, args) => userResolver.createUser(_, args),
  },
};

export default resolvers;
