import axios from "axios";
import {
  IBoardData,
  IBoardUpdateData,
  IUploadImageData,
} from "./boardInterface";

const createBoard = async (boardData: IBoardData) => {
  const response = await axios.post("/api/boards", boardData);

  return response.data;
};

const getAllBoards = async () => {
  const response = await axios.get("/api/boards");

  return response.data;
};

const getBoardById = async (id: string) => {
  const response = await axios.get(`/api/boards/${id}`);

  return response.data;
};

const updateBoard = async (boardData: IBoardUpdateData) => {
  const response = await axios.patch(`/api/boards/${boardData.id}`, {
    title: boardData.title,
    background: boardData.background,
  });

  return response.data;
};

const uploadBoardImage = async (data: IUploadImageData) => {
  const formData = new FormData();
  formData.append("image", data.image);

  const response = await axios.post(`/api/uploads/boards/${data.id}`, formData);

  return response.data;
};

const deleteBoard = async (id: string) => {
  const response = await axios.delete(`/api/boards/${id}`);

  return response.data;
};

const boardService = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  uploadBoardImage,
  deleteBoard,
};

export default boardService;
