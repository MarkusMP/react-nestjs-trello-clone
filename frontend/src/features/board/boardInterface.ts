export interface IBoardState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  boards: IBoard[];
}

export interface IBoard {
  id: string;
  userId: string;
  title: string;
  background: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBoardData {
  title: string;
  photo?: string;
}
