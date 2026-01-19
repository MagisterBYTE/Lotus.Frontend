import { ApiRequestConfig } from './ApiRequestConfig';
/**
 * Ошибка запроса
 */
export interface ApiRequestError extends Error {
    /**
     * Ответ
     */
    response?: {
        /**
         * Статус ответа
         */
        status: number;
        statusText: string;
        data: any;
        url?: string;
    };
    request?: XMLHttpRequest;
    code?: string;
    config?: ApiRequestConfig;
}
//# sourceMappingURL=ApiRequestError.d.ts.map