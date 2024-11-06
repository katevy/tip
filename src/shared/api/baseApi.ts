import { API_URL } from "@shared/config";

class ApiInstance {

    private baseUrl: string

    constructor() {
        this.baseUrl = API_URL
    }

    private async request<T>(endpoint: string, method: string, data?: any, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка запроса')
        }

        return response.json();
    }

    async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, 'GET', undefined, options)
    }

    async post<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, 'POST', data, options)
    }

    async put<T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, 'PUT', data, options)
    }

    async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, 'DELETE', undefined, options)
    }
}

export const apiInstance = new ApiInstance();
