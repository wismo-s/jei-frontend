import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

export class AxiosInstanceCreator {
    protected apiBaseUrl: string;
    protected getTokenFn: () => string | null;

    constructor(apiBaseUrl: string, getTokenFn: () => string | null) {
        this.apiBaseUrl = apiBaseUrl;
        this.getTokenFn = getTokenFn;
    }

    public createApi(): AxiosInstance {
        const axiosInstance = axios.create({
            baseURL: this.apiBaseUrl,
        });

        axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = this.getTokenFn();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => Promise.reject(error),
        );

        return axiosInstance;
    }
}
