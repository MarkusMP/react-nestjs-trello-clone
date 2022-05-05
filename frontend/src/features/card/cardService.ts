import axios from "axios";
import { ICreateCommentData, IUpdateComment } from "./cardInterface";

const createCardComment = async (data: ICreateCommentData) => {
  const response = await axios.post(`/api/comments/${data.cardId}`, {
    comment: data.comment,
  });

  return response.data;
};

const getComments = async (cardId: string) => {
  const response = await axios.get(`/api/comments/${cardId}`);
  return response.data;
};

const removeComment = async (commentId: string) => {
  const response = await axios.delete(`/api/comments/${commentId}`);
  return { ...response.data, id: commentId };
};

const updateComment = async (data: IUpdateComment) => {
  const response = await axios.patch(`/api/comments/${data.id}`, {
    comment: data.comment,
  });
  return response.data;
};

const cardService = {
  createCardComment,
  getComments,
  removeComment,
  updateComment,
};

export default cardService;
