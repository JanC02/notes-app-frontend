import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    adapter: 'fetch',
    withCredentials: true
});