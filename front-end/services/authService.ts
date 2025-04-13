import { ApiRequest, ApiResponse } from './apiRequest';

export const verifyToken = async () => {
  try {
    const result = await ApiRequest<ApiResponse>('/auth/verify-token', 'GET');
    return result;
  } catch (error) {
    throw error;
  }
};
