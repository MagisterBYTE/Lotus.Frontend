import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * Базовый класс для сервисов Api
 */
export declare abstract class ApiService {
    private _api;
    protected get api(): AxiosInstance;
    constructor(baseURL: string);
    protected handleRequest(config: InternalAxiosRequestConfig<unknown>): InternalAxiosRequestConfig<unknown> | Promise<InternalAxiosRequestConfig<unknown>>;
    protected handleRequestError(error: AxiosError): Promise<AxiosError>;
    protected handleResponse(response: AxiosResponse): AxiosResponse<any, any, {}>;
    protected handleResponseError(error: AxiosError): Promise<never>;
    protected get<TResponse = unknown>(path: string, config?: AxiosRequestConfig<unknown>): Promise<AxiosResponse<TResponse, any, {}>>;
    protected post<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest): Promise<AxiosResponse<TResponse, any, {}>>;
    protected put<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest): Promise<AxiosResponse<TResponse, any, {}>>;
    protected delete<TResponse = unknown>(path: string, config?: AxiosRequestConfig<unknown>): Promise<AxiosResponse<TResponse, any, {}>>;
    protected getConfigAcceptJson(): AxiosRequestConfig;
}
//# sourceMappingURL=ApiService.d.ts.map