export interface Users {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoggedInUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  createdDate: number;
}
