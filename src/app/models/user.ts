export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  email: string;
  firstName: string;
  firstSurname: string;
  id: number;
  password: string;
  permissions: Permissions;
  role: number;
  secondName: string;
  secondSurname: string;
  state: string;
  token: string;
}

export interface Permissions {
  usuarios: string[];
  words: string[];
}
