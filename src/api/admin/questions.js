import { apiClient } from "./client";

export async function getQuestions(quiz_id) {
    const { data } = await apiClient.get("quiz/questions", { params: {quiz_id: quiz_id}});
    return data;
}

export async function createQuestion(data, logo) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (logo) {
      formData.append("picture", logo);
    }
    await apiClient.post("quiz/questions", formData);
}

export async function updateQuestion(id, data) {
    const payload = {...data, id: id}
    await apiClient.put("quiz/questions", payload);
}

export async function deleteQuestion(id) {
    await apiClient.put("quiz/questions", {id: id});
}
