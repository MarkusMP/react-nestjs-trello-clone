import axios from "axios";
import { IUserData } from "./profileInterface";

const getProfile = async () => {
  const response = await axios.get("/api/users");

  return response.data;
};

const updateProfile = async (userData: IUserData) => {
  const response = await axios.patch("/api/users", userData);

  return response.data;
};

const deleteProfile = async () => {
  const response = await axios.delete("/api/users");

  return response.data;
};

const profileService = { getProfile, updateProfile, deleteProfile };

export default profileService;
