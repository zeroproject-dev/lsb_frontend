export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  email: string;
  first_name: string;
  first_surname: string;
  id: number;
  password: string;
  permissions: Permissions;
  role: number;
  second_name: string;
  second_surname: string;
  state: string;
  token: string;
}

type permission = 'roles' | 'usuarios' | 'words';

export type Permissions = {
  [key in permission]: string[];
};

// roles:    string[];
// usuarios: string[];
// words:    string[];
//
// export interface Permissions {
//   usuarios: string[];
//   words: string[];
// }
//
