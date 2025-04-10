import { ApiError, ApiResponse } from "../../types/apiTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      message: errorData.message || response.statusText,
      status: response.status,
    } as ApiError;
  }

  const data = await response.json();
  return {
    data,
    status: response.status,
    statusText: response.statusText,
  };
};

export const fetchClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await fetch(`${BASE_URL}${url}`);
    return handleResponse<T>(response);
  },

  post: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  put: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
    });
    return handleResponse<T>(response);
  },
};