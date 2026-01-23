import { ApiRequestConfig } from './ApiRequestConfig';

/**
 * Ошибка запроса
 */
export class ApiRequestError extends Error 
{
  response?: {
    status: number;
    statusText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    url?: string;
  };
  request?: XMLHttpRequest;
  code?: string;
  config?: ApiRequestConfig;

  constructor(message: string, responseData?: ApiRequestError['response']) 
  {
    super(message);
    this.name = 'ApiRequestError';
    this.response = responseData;
    
    // Исправление прототипа для корректной работы instanceof в старых окружениях
    Object.setPrototypeOf(this, ApiRequestError.prototype);
  }
}