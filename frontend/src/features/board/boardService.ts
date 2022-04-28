import axios from "axios";
import { IBoardData } from "./boardInterface";

const createBoard = async (boardData: IBoardData) => {
  const response = await axios.post("/api/boards", boardData);

  return response.data;
};

const getAllBoards = async () => {
  const response = await axios.get("/api/boards");

  return response.data;
};

const boardService = { createBoard, getAllBoards };

export default boardService;
