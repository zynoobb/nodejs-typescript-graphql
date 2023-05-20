import database from "../../config";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { ICreateUserArgs } from "../interfaces/user/user-service.interface";
import { pagination } from "../../common/interfaces/common.interfaces";
import { getPagination } from "../../common/util/pagination";

export class UserService {
  async findOneByName(email: string): Promise<User> {
    return database.user.findFirst({ where: { email } });
  }

  async findOneById(id: string): Promise<User> {
    return database.user.findFirst({ where: { id } });
  }

  async createUser(createUserInput: ICreateUserArgs): Promise<User> {
    const { password, email } = createUserInput;

    const emailVerify = await this.findOneByName(email);
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

  async fetchUser(id: string): Promise<User> {
    return database.user.findFirst({
      where: { id },
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

    // getPagination 페이지를 분할하여 유저들 데이터를 반환하기 위한 함수입니다.
    const [start, end] = getPagination(pagination);

    return filterUsers.slice(start, end);
  }
}
