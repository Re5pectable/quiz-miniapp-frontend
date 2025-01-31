import { apiClient } from "./client";

export async function apiGetQuestions(quiz_id) {
    const { data } = await apiClient.get("quiz/questions", { params: {quiz_id: quiz_id}});
    return data;
}

export async function apiGetOneQuestion(id) {
    const { data } = await apiClient.get("quiz/questions/one", { params: {question_id: id}});
    return data;
}

export async function apiCreateQuestion(data, logo) {
    const formData = new FormData();
    formData.append("quiz_question", JSON.stringify(data));
    if (logo) {
      formData.append("picture", logo);
    }
    await apiClient.post("quiz/questions", formData);
}

export async function apiUpdateQuestion(data, newPic) {
    const formData = new FormData();
    formData.append("quiz_question", JSON.stringify(data));
    if (newPic) {
      formData.append("picture", newPic);
    }
    await apiClient.put("quiz/questions", formData);
}

export async function apiDeleteQuestion(id) {
    await apiClient.delete("quiz/questions", {data: {id: id}});
}
