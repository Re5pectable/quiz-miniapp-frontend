import { apiClient } from "./client";

export async function getResultList(quizId) {
  const { data } = await apiClient.get("/quiz/results", {params: {quiz_id: quizId}});
  return data;
}

export async function apiGetResultOne(id) {
  const { data } = await apiClient.get("/quiz/results/one", { params: { quiz_result_id: id } });
  return data;
}

export async function apiCreateResult(data, logo) {
  const formData = new FormData();
  formData.append("quiz_result", JSON.stringify(data));
  if (logo) {
    formData.append("logo_pic", logo);
  }
  await apiClient.post("/quiz/results", formData);
}

export async function apiUpdateResult(data, newLogo) {
  const formData = new FormData();
  formData.append("quiz_result", JSON.stringify(data));
  if (newLogo) {
    formData.append("logo_pic", newLogo);
  }
  await apiClient.put("/quiz/results", formData);
}

export async function apiDeleteResult(id) {
  await apiClient.delete("/quiz/results", { data: { id: id } });
}
