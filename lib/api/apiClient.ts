import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create a custom axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Skip adding auth header for auth-related endpoints
    if (config.url?.includes('/auth/')) {
      return config;
    }
    
    try {
      // Get the current user directly from Firebase Auth
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // Get the Firebase ID token
        const token = await currentUser.getIdToken();
        
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the successful response data directly
    return response.data;
  },
  (error: AxiosError) => {
    // Handle errors based on status code
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      
      // Handle specific status codes
      if (status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        console.error('Unauthorized access - please log in');
        // You can add a redirect to login here if needed
      } else if (status === 403) {
        // Handle forbidden
        console.error('You do not have permission to access this resource');
      } else if (status === 404) {
        // Handle not found
        console.error('The requested resource was not found');
      } else if (status >= 500) {
        // Handle server errors
        console.error('A server error occurred. Please try again later.');
      }
      
      // Return a rejected promise with error information
      return Promise.reject({
        message: (data as { message?: string })?.message || error.message,
        status: status,
        data: data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
      return Promise.reject({
        message: 'No response received from server. Please check your connection.',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      return Promise.reject({
        message: 'Error setting up request. Please try again.',
      });
    }
  }
);

// Helper function to make API requests
export const apiRequest = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.request<T, T>(config);
    return response;
  } catch (error) {
    // The error is already processed by the interceptor
    return Promise.reject(error);
  }
};

export default apiClient;
