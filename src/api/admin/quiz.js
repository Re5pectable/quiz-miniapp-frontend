import { apiClient } from "./client";

export async function getQuizList() {
  const { data } = await apiClient.get("quiz/all");
  return data;
}

export async function getQuiz(id) {
  const { data } = await apiClient.get("quiz", { params: { id: id } });
  return data;
}

export async function createQuiz(data, logo) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (logo) {
    formData.append("logo_pic", logo);
  }
  await apiClient.post("quiz", formData);
}

export async function updateQuiz(data, newLogo) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (newLogo) {
    formData.append("logo_pic", newLogo);
  }
  await apiClient.put("quiz", formData);
}

export async function deleteQuiz(id) {
  await apiClient.delete("quiz", { data: { id: id } });
}
