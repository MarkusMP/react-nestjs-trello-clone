export interface ICardState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  errorMessage: string;
}

export interface IDeleteCardData {
  cardId: string;
  listId: string;
}
