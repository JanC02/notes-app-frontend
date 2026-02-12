import axios from "axios";
import type { AxiosResponse } from "axios";
import type { RefreshResponse } from "../types/api";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let refreshPromise: Promise<AxiosResponse<RefreshResponse>> | null = null;

api.interceptors.response.use(
    undefined,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;

            if (
                originalRequest.url?.includes('/auth/login')
            ) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(error);
            }

            try {
                if (refreshPromise !== null) {
                    await refreshPromise;
                    return api(originalRequest);
                } else {
                    const refreshToken = localStorage.getItem('refreshToken');
                    refreshPromise = axios.post<RefreshResponse>(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh`, {
                        refreshToken,
                    }).then(response => {
                        const { accessToken, refreshToken: newRefreshToken } = response.data;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);
                        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
                    return refreshPromise
                }
            } catch (refreshError) {
                console.log('refresh failed, redirect');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);