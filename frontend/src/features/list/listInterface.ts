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
  listIdChanged: string;
}
