import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
       
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((res) => {
    return res
})


export default axiosInstance