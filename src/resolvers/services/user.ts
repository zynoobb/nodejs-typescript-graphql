import database from "../../config";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import {
  createUserInput,
  IUserServiceCreateUser,
  IUserServiceFindOneByName,
} from "../interfaces/user/user-service.interface";

export class UserService {
  async findOneByName({ email }: IUserServiceFindOneByName): Promise<User> {
    return database.user.findFirst({ where: { email } });
  }

  async createUser(createUserInput: IUserServiceCreateUser): Promise<User> {
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
}
