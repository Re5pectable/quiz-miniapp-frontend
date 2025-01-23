import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://quiz.kley.media/api",
  withCredentials: true,
});