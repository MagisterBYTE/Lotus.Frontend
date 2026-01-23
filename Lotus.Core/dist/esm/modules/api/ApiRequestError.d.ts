import { ApiRequestConfig } from './ApiRequestConfig';
/**
 * Ошибка запроса
 */
export declare class ApiRequestError extends Error {
    response?: {
        status: number;
        statusText: string;
        data: any;
        url?: string;
    };
    request?: XMLHttpRequest;
    code?: string;
    config?: ApiRequestConfig;
    constructor(message: string, responseData?: ApiRequestError['response']);
}
//# sourceMappingURL=ApiRequestError.d.ts.map