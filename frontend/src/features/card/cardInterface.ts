export interface ICardState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  errorMessage: string;
  commments: IComment[];
}

export interface IComment {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cardId: string;
}

export interface ICreateCommentData {
  comment: string;
  cardId: string;
}

export interface IDeleteComment {
  id: string;
  message: string;
}

export interface IUpdateComment {
  id: string;
  comment: string;
}
