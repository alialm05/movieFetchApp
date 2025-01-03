import axios from "axios";

const axiosAuth = axios.create({ // axios instance with authentication
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {'Content-Type': "application/json"},
    withCredentials: true,
})

export default axiosAuth