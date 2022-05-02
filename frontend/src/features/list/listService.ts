import axios from "axios";
import {
  ICreateListData,
  IDeleteList,
  IMoveListData,
  IUpdateListData,
} from "./listInterface";

const createList = async (data: ICreateListData) => {
  const response = await axios.post(`/api/lists/${data.boardId}`, {
    title: data.title,
  });

  return response.data;
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
    `/api/lists/position/${data.listId}/${data.listIdChanged}`
  );

  return response.data;
};

const listService = {
  createList,
  getAllLists,
  removeList,
  updateList,
  moveList,
};

export default listService;
