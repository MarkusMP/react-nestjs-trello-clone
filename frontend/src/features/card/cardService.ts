import axios from "axios";
import { IDeleteCardData } from "./cardInterface";

const deleteCard = async (data: IDeleteCardData) => {
  const response = await axios.delete(`/api/cards/${data.cardId}`);

  return { ...response.data, listId: data.listId };
};

const cardService = { deleteCard };

export default cardService;
