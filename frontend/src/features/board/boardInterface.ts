export interface IBoardState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  boards: IBoard[];
  board: IBoard | null;
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

export interface IBoardUpdateData {
  title?: string;
  background?: string;
  id: string;
}

export interface IUploadImageData {
  image: File;
  id: string;
}

export interface IImageData {
  photo: string;
}

export interface IMessage {
  message: string;
}
