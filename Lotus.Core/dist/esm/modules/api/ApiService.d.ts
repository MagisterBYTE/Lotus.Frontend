import { ApiRequestConfig, IApiRequestConfig } from './ApiRequestConfig';
import { ApiRequestError } from './ApiRequestError';
/**
 * Класс для работы с API
 */
export declare class ApiService {
    private _baseUrl;
    get baseUrl(): string;
    /**
     * Конструктор
     * @param baseUrl - Базовый URL API (опционально)
     */
    constructor(baseUrl?: string);
    /**
     * Создает полный URL для запроса
     */
    protected createFullUrl(path: string): string;
    /**
     * Выполняет HTTP-запрос с обработкой ошибок
     */
    protected request<TResponse = unknown>(url: string, config: ApiRequestConfig): Promise<TResponse>;
    /**
     * Обработка конфигурации запроса
     * @param config
     * @returns
     */
    protected handleRequest(fullUri: string, config: ApiRequestConfig): Promise<ApiRequestConfig>;
    /**
     * Обработка ошибок ответа
     */
    protected handleResponseError(uri: string, error: ApiRequestError): Promise<never>;
    /**
     * GET запрос
     */
    get<TResponse>(path: string, config?: IApiRequestConfig): Promise<TResponse>;
    /**
     * POST запрос
     */
    post<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest, config?: ApiRequestConfig): Promise<TResponse>;
    /**
     * PUT запрос
     */
    put<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest, config?: ApiRequestConfig): Promise<TResponse>;
    /**
     * DELETE запрос
     */
    delete<TResponse = unknown>(path: string, config?: ApiRequestConfig): Promise<TResponse>;
}
//# sourceMappingURL=ApiService.d.ts.map