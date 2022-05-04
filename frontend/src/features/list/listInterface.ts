export interface IListState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  lists: IList[];
}

export interface IList {
  id: string;
  boardId: string;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  cards: ICard[];
}

export interface ICreateListData {
  title: string;
  boardId: string;
}

export interface IMessage {
  message: string;
}

export interface IDeleteData {
  message: string;
  listId: string;
}

export interface IDeleteList {
  listId: string;
  boardId: string;
}

export interface IUpdateListData {
  listId: string;
  title: string;
}

export interface IMoveListData {
  listId: string;
  index: number;
}

export interface ICreateCard {
  title: string;
  listId: string;
}

export interface ICard {
  id: string;
  listId: string;
  title: string;
  position: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMoveCardData {
  cardId: string;
  index: number;
  listId: string;
}

export interface IUpdateCard {
  cardId: string;
  title?: string;
  description?: string;
  listId: string;
}

export interface IUpdateCardData {
  card: ICard;
  listId: string;
}

export interface IDeleteCardData {
  cardId: string;
  listId: string;
}

export interface IDeleteCard {
  cardId: string;
  listId: string;
  message: string;
}
