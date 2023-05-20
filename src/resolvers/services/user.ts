import database from "../../config";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import {
  ICreateUserArgs,
  IFetchUserArgs,
  IUserServiceFindOneByName,
} from "../interfaces/user/user-service.interface";
import { pagination } from "../interfaces/common/common.interfaces";

export class UserService {
  async findOneByName({ email }: IUserServiceFindOneByName): Promise<User> {
    return database.user.findFirst({ where: { email } });
  }

  async createUser(createUserInput: ICreateUserArgs): Promise<User> {
    const { password, email } = createUserInput;

    const emailVerify = await this.findOneByName({ email });
    if (emailVerify)
      throw { status: 409, message: "이미 존재하는 이메일입니다." };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await database.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
      },
    });

    return user;
  }

  async fetchUser({ id }: IFetchUserArgs): Promise<User> {
    return database.user.findFirst({
      where: { id: id },
      include: {
        posts: true,
      },
    });
  }

  async fetchUsers(pagination: pagination): Promise<User[]> {
    const users = await database.user.findMany({
      include: {
        posts: {
          where: {
            AND: [
              {
                content: {
                  contains: "graphql",
                },
              },
              {
                published: true,
              },
            ],
          },
        },
      },
    });

    const filterUsers = users.filter((user) => user.posts.length !== 0);

    // pagination 기본값은 page = 1 / limit = 5
    let { page, limit } = pagination;
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }

    const [start, end] = [(page - 1) & limit, limit * page];

    return filterUsers.slice(start, end);
  }
}
