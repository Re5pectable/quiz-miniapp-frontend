import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

export async function tryAuth(username, password) {
    const basicAuth = btoa(`${username}:${password}`);
    try {
        await apiClient.post('session/try-auth', {}, { headers: {"Authorization" : `Basic ${basicAuth}`}})
        apiClient.defaults.headers.common['Authorization'] = `Basic ${basicAuth}`;
        console.log(true)
        return true
    } catch (error) {
        console.log(false)
        return false
    }
}

