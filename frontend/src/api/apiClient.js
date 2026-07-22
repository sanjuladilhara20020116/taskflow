import axios from "axios";

// Create one Axios client for every API request.
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT token before sending a request.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "task_manager_token"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;