import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        "content-type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("access")}`
    },
});

export default axiosInstance;