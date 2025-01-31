import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

export async function login(username, password) {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    try {
        const { data } = await apiClient.post("/auth", form, { withCredentials: true });
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
        return true;
    } catch (error) {
        console.log(false);
        return false;
    }
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                const { data } = await apiClient.post("/auth/new-access-token", {}, {withCredentials: true});

                apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
                error.config.headers["Authorization"] = `Bearer ${data.access_token}`;

                return apiClient.request(error.config);
            } catch (err) {
                throw new Error("Unable to refresh token.");
            }
        }
        throw error;
    }
);
