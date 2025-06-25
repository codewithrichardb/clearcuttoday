import { useCallback, useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';
import { useAuth } from '@/contexts/AuthContext';

interface ApiConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

export const useApi = (config: ApiConfig = {}) => {
  const { currentUser } = useAuth();

  // Create a memoized request function with auth
  const requestWithAuth = useCallback(async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    requestConfig: AxiosRequestConfig = {}
  ) => {
    // Skip auth for certain endpoints or if explicitly skipped
    const skipAuth = config.skipAuth || url.includes('/auth/');
    
    // Prepare headers
    const headers: Record<string, string> = {
      ...(requestConfig.headers as Record<string, string> || {}),
    };
    
    // Add auth token if needed
    if (!skipAuth && currentUser) {
      try {
        const token = await currentUser.getIdToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting auth token:', error);
      }
    }
    
    // Make the request
    return apiClient.request<T>({
      ...requestConfig,
      method,
      url,
      headers,
    });
  }, [currentUser, config.skipAuth]);
  // GET request
  const get = useCallback(<T>(
    url: string, 
    config: AxiosRequestConfig = {}
  ) => requestWithAuth<T>('get', url, config), [requestWithAuth]);

  // POST request
  const post = useCallback(<T>(
    url: string, 
    data: unknown = {}, 
    config: AxiosRequestConfig = {}
  ) => requestWithAuth<T>('post', url, { ...config, data }), [requestWithAuth]);

  // PUT request
  const put = useCallback(<T>(
    url: string, 
    data: unknown = {}, 
    config: AxiosRequestConfig = {}
  ) => requestWithAuth<T>('put', url, { ...config, data }), [requestWithAuth]);

  // PATCH request
  const patch = useCallback(<T>(
    url: string, 
    data: unknown = {}, 
    config: AxiosRequestConfig = {}
  ) => requestWithAuth<T>('patch', url, { ...config, data }), [requestWithAuth]);

  // DELETE request
  const del = useCallback(<T>(
    url: string, 
    config: AxiosRequestConfig = {}
  ) => requestWithAuth<T>('delete', url, config), [requestWithAuth]);

  return useMemo(() => ({
    get,
    post,
    put,
    patch,
    delete: del,
    client: apiClient,
  }), [get, post, put, patch, del]);
};

export default useApi;
