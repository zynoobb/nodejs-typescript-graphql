export type IUserServiceCreateUser = createUserInput;

export interface createUserInput {
  name: string;
  password: string;
  email: string;
}

export interface IUserServiceFindOneByName {
  email: string;
}
