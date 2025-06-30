import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        ContentType: "application/json",
        timeout: 1000,
    },
});

export default axiosInstance;