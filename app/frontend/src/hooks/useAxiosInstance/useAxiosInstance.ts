import { REST_SERVICE_URL_ROOT, CLIENT_ID, CLIENT_SECRET, PERSISTED_STATE_KEY } from '../../common/constants';
import { AxiosResponse } from 'axios';

// Lazy-load axios and qs
const initializeService = async () => {
  const axios = (await import('axios')).default;
  const Qs = (await import('qs')).default;

  const service = axios.create({
    baseURL: REST_SERVICE_URL_ROOT,
  });

  // Add request interceptor
  service.interceptors.request.use(
    (config) => {
      try {
        config.paramsSerializer = (params) =>
          Qs.stringify(params, {
            arrayFormat: 'brackets',
            encode: false,
          });

        const storedState = localStorage.getItem(PERSISTED_STATE_KEY || '');
        if (storedState) {
          const token = JSON.parse(storedState)?.auth?.credentials;
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json';
            config.headers['Access-Control-Allow-Origin'] = REST_SERVICE_URL_ROOT;
          }
        }
      } catch (error) {
        console.error('Unauthorized', error);
      }

      return config;
    },
    (error) => {
      handleError(error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  service.interceptors.response.use(handleSuccess, handleError);

  return service;
};

const handleSuccess = (response: any) => response;

const handleError = (error: any) => {
  const status = error.response ? error.response.status : null;
  switch (status) {
    case 401:
      console.error('Unauthorized access', error);
      break;
    case 404:
      console.error('Resource not found', error);
      break;
    default:
      console.error('An error occurred', error);
      break;
  }
  return Promise.reject(error);
};

export const token = async (payload: { username: string; password: string }): Promise<any> => {
  const service = await initializeService();
  const params = new URLSearchParams();
  params.append('username', payload.username);
  params.append('password', payload.password);
  params.append('grant_type', 'password');

  return service.request({
    method: 'POST',
    url: `${REST_SERVICE_URL_ROOT}/oauth/token`,
    responseType: 'json',
    params: params,
    headers: {
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const axiosGet = async <T>(path: string, params?: Record<string, any>): Promise<AxiosResponse<T>> => {
    const service = await initializeService();
    const response = await service.get<T>(path, { params });
    return response;
};

export const axiosPatch = async <T>(path: string, payload: any): Promise<AxiosResponse<T>> => {
    const service = await initializeService();
    const response = await service.patch<T>(path, payload);
    return response;
};

export const axiosPost = async <T>(path: string, payload: any): Promise<AxiosResponse<T>> => {
  const service = await initializeService();
  const response = await service.post<T>(path, payload);
  return response;};

export const axiosDelete = async <T>(path: string): Promise<AxiosResponse<T>> => {
    const service = await initializeService();
    const response = await service.delete<T>(path);
    return response;
};
