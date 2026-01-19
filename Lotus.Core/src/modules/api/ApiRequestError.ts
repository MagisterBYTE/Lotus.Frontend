import { ApiRequestConfig } from './ApiRequestConfig';

/**
 * Ошибка запроса
 */
export interface ApiRequestError extends Error
{
  /**
   * Ответ
   */
  response?: {

    /**
     * Статус ответа
     */
    status: number;
    statusText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    url?: string;
  };
  request?: XMLHttpRequest;
  code?: string;
  config?: ApiRequestConfig;
}