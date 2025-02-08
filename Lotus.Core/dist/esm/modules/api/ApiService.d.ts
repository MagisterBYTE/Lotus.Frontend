/**
 * Базовый класс для сервисов Api
 */
export declare abstract class ApiService {
    constructor();
    protected get<TResponse = any>(path: string, config?: any): void;
    protected post<TResponse = any, TRequest = any>(path: string, payload: TRequest, config?: any): void;
    protected put<TResponse = any, TRequest = any>(path: string, payload: TRequest, config?: any): void;
    protected delete<TResponse = any>(path: string, config?: any): void;
    protected getConfigAcceptJson(): RequestInit;
}
