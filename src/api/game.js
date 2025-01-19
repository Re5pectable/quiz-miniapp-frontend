import { apiClient } from "./client";

export async function apiStartGame(quizId) {
  const { data } = await apiClient.post("game/start", { quiz_id: quizId });
  return data;
}

export async function apiGetGame(gameId) {
  const { data } = await apiClient.get("game", {params: {game_id: gameId}})
  return data;
}

export async function apiGameNext(gameId) {
  const { data } = await apiClient.get("game/next", {params: {game_id: gameId}})
  return data;
}

export async function apiMakeAnswer(gameId, answerId) {
  const { data } = await apiClient.post("game/answer", {game_id: gameId, answer_id: answerId})
  return data;
}

export async function apiGetResult(gameId) {
  const { data } = await apiClient.get("game/result", {params: {game_id: gameId}})
  return data;
}
