export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserRegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  password: string;
}