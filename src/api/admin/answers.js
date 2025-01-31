import { apiClient } from "./client";

export async function apiGetAnswers(questionId) {
    const { data } = await apiClient.get("quiz/questions/answers", { params: {quiz_question_id: questionId}});
    return data;
}

export async function apiGetOneAnswer(id) {
    const { data } = await apiClient.get("quiz/questions/answers/one", { params: {quiz_question_answer_id: id}});
    return data;
}

export async function apiGetOneQuestion(id) {
    const { data } = await apiClient.get("quiz/questions/one", { params: {quiz_question_answer_id: id}});
    return data;
}

export async function apiCreateAnswer(data) {
    await apiClient.post("quiz/questions/answers", data);
}

export async function apiUpdateAnswer(data) {
    await apiClient.put("quiz/questions/answers", data);
}

export async function apiDeleteAnswer(id) {
    await apiClient.delete("quiz/questions/answers", {data: {id: id}});
}
