import { apiClient } from "./client";

export async function apiGetQuizList() {
  const { data } = await apiClient.get("quiz/preview");
  return data;
}

export async function apiGetQuiz(id) {
  const { data } = await apiClient.get("quiz/", {params: {id: id}});
  return data;
}