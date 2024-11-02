// baseAxios.js

import axios from "axios";
import { useUserStore } from "@/stores/user"; // 假設你有一個用戶存儲的狀態管理
import mainRouter from '@/router/main'; // 引入前台路由
import adminRouter from '@/router/admin'; // 引入後台路由

export default class BaseAxios {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000,
        });

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const userStore = useUserStore();
                const token = userStore.token;
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => this.handleResponseError(error)
        );
    }

    handleResponseError(error) {
        console.error("Axios Error:", error);
        const { response, request } = error;

        if (response) {
            if (!this.handleHttpError(response.status, response.data)) {
                return Promise.reject(response);
            }
        } else if (request) {
            this.handleNetworkError(error);
        } else {
            this.handleUnexpectedError(error);
        }

        return Promise.resolve(response);
    }

    handleHttpError(status, msg) {
        const message = msg?.error?.message || msg?.message || "Something went wrong.";
        console.error(`API error: ${status} | ${message}`);

        switch (status) {
            case 401:
            case 403:
                if (this.isBackendRoute()) {
                    adminRouter.push("/login");
                } else {
                    mainRouter.push("/login");
                }
                break;
            case 500:
                console.error("Internal Server Error");
                break;
            case 503:
                console.error("Service Unavailable");
                break;
            default:
                console.error("Other Error");
                break;
        }
        return false;
    }

    isBackendRoute() {
        const currentRoute = router.currentRoute.value;
        return currentRoute.path.startsWith('admin'); // 根據路徑前綴來判斷
    }

    handleNetworkError(error) {
        console.error("Network Error:", error);
    }

    handleUnexpectedError(error) {
        if (!navigator.onLine) {
            console.error("Network failure");
        }
        if (error.code === "ECONNABORTED") {
            console.error("Request timeout");
        }
    }

    async request(method, url, data, headers) {
        const config = {
            method,
            url,
            headers: {
                ...headers,
            },
            data,
        };

        try {
            const response = await this.axiosInstance.request(config);
            return response.data;
        } catch (error) {
            console.error(`Error in ${method.toUpperCase()} request:`, error);
            throw error;
        }
    }

    get(url, params, headers) {
        return this.request("get", url, params, headers);
    }

    post(url, data, headers) {
        return this.request("post", url, data, headers);
    }

    put(url, data, headers) {
        return this.request("put", url, data, headers);
    }

    patch(url, data, headers) {
        return this.request("patch", url, data, headers);
    }

    delete(url, headers) {
        return this.request("delete", url, undefined, headers);
    }
}