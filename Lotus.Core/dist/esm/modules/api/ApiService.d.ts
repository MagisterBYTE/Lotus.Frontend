import { ApiRequestConfig, IApiRequestConfig } from './ApiRequestConfig';
import { ApiRequestError } from './ApiRequestError';
/**
 * Класс для работы с API
 */
export declare class ApiService {
    /**
     * Генерирует полный URL с учетом параметров запроса
     * @param baseUrl - Базовый адрес (напр. 'https://api.com')
     * @param params - Объект URLSearchParams с параметрами
     * @returns Строка полного URL
     */
    static buildFullUrl(baseUrl: string, params: URLSearchParams): string;
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
    protected requestAsync<TResponse = unknown>(url: string, config: ApiRequestConfig): Promise<TResponse>;
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
    get<TResponse>(path: string, searchParams?: URLSearchParams, config?: IApiRequestConfig): Promise<TResponse>;
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
    delete<TResponse = unknown>(path: string, searchParams?: URLSearchParams, config?: ApiRequestConfig): Promise<TResponse>;
}
//# sourceMappingURL=ApiService.d.ts.map