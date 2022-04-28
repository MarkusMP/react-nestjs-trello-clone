export interface IProfileState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  user: IUser | null;
}

export interface IUser {
  id: string;
  email: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  message: string;
}
export interface IUserData {
  email: string;
  password: string;
}
