import { User } from "@prisma/client";
import database from "../config";
import { pagination } from "./interfaces/common/common.interfaces";
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

  fetchUsers(_, { pagination }: { pagination: pagination }): Promise<User[]> {
    try {
      return this.userService.fetchUsers(pagination);
    } catch (error) {
      throw new Error(error);
    }
  }
}
const userResolver = new UserResolver();

const resolvers = {
  Query: {
    fetchUsers: (_, args) => userResolver.fetchUsers(_, args),
  },
  Mutation: {
    createUser: (_, args) => userResolver.createUser(_, args),
  },
};

export default resolvers;
