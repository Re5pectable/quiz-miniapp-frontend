import { apiClient } from "./client";

export async function apiInitSession(userTgData) {
  const sessionId = localStorage.getItem("session_id");
  const { data } = await apiClient.post("/session/init", {session_id: sessionId, user_data: userTgData});
  localStorage.setItem('session_id', data.session_id);
  apiClient.defaults.headers.common["Session-Id"] = data.session_id;
  return data
}
