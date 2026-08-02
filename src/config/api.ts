import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { RefreshResponse, TokenStorage } from "../types/api";

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

interface QueuedRequest {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const tokenStorage: TokenStorage = {
    accessToken: null
};

api.interceptors.request.use(
    (config) => {
        if (tokenStorage.accessToken) {
            config.headers.Authorization = `Bearer ${tokenStorage.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null): void => {
    failedQueue.forEach((prom) => {
        if (error || token === null) {
            prom.reject(error ?? new Error("Token refresh failed"));
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post<RefreshResponse>("/api/auth/refresh", undefined, {
                    withCredentials: true,
                });

                const newToken = data.accessToken;
                tokenStorage.accessToken = newToken;
                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                processQueue(null, newToken);
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);