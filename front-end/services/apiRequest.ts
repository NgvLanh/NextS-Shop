import { AxiosRequestConfig } from 'axios';
import apiClient from '../configs/ApiConfig';

export type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function ApiRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any
): Promise<T> {
  let token = '';
  if (typeof window !== 'undefined') {
    token =
      localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }

  const config: AxiosRequestConfig = {
    url,
    method,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
}
