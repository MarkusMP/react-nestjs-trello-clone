import axios from "axios";
import {
  ICreateCard,
  ICreateListData,
  IDeleteCardData,
  IDeleteList,
  IMoveCardData,
  IMoveListData,
  IUpdateCard,
  IUpdateListData,
} from "./listInterface";

const createList = async (data: ICreateListData) => {
  const response = await axios.post(`/api/lists/${data.boardId}`, {
    title: data.title,
  });

  if (!response.data.cards) {
    return { ...response.data, cards: [] };
  } else {
    return response.data;
  }
};

const getAllLists = async (boardId: string) => {
  const response = await axios.get(`/api/lists/${boardId}`);

  return response.data;
};

const removeList = async (data: IDeleteList) => {
  const response = await axios.delete(
    `/api/lists/${data.listId}/boards/${data.boardId}`
  );

  return { ...response.data, listId: data.listId };
};

const updateList = async (data: IUpdateListData) => {
  const response = await axios.patch(`/api/lists/${data.listId}`, {
    title: data.title,
  });

  return response.data;
};

const moveList = async (data: IMoveListData) => {
  const response = await axios.patch(
    `/api/lists/move/${data.listId}/${data.index}`
  );

  return { ...response.data, listId: data.listId, index: data.index };
};

const createCard = async (data: ICreateCard) => {
  const response = await axios.post(`/api/cards/${data.listId}`, {
    title: data.title,
  });

  return response.data;
};

const changeCardPosition = async (data: IMoveCardData) => {
  const response = await axios.patch(
    `/api/cards/move/${data.cardId}/${data.index}`
  );

  return {
    ...response.data,
    cardId: data.cardId,
    index: data.index,
    listId: data.listId,
  };
};

const updateCard = async (data: IUpdateCard) => {
  const response = await axios.patch(`/api/cards/${data.cardId}`, {
    title: data.title,
    description: data.description,
  });
  return { card: response.data, listId: data.listId };
};

const deleteCard = async (data: IDeleteCardData) => {
  const response = await axios.delete(
    `/api/cards/${data.cardId}/list/${data.listId}`
  );

  return { ...response.data, listId: data.listId, cardId: data.cardId };
};

const listService = {
  createList,
  getAllLists,
  removeList,
  updateList,
  moveList,
  createCard,
  changeCardPosition,
  updateCard,
  deleteCard,
};

export default listService;
