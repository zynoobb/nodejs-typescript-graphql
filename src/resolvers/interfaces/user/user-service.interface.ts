export interface ICreateUserArgs {
  name: string;
  password: string;
  email: string;
}

export interface IUserServiceFindOneByName {
  email: string;
}

export interface IFetchUserArgs {
  id: string;
}
