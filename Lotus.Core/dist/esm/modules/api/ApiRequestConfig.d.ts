/**
 * Тип для конфигурации запроса
 */
export interface IApiRequestConfig extends RequestInit {
    /**
     * Время в миллисекундах, которое запрос будет ждать ответа
     */
    timeout?: number;
}
/**
 * Класс-строитель для формирования конфигурации API запроса.
 * Реализует интерфейс IApiRequestConfig и предоставляет удобный API для модификации параметров.
 */
export declare class ApiRequestConfig implements IApiRequestConfig {
    /**
     * Заголовки запроса
     */
    headers: Headers;
    /**
     * Таймаут запроса в миллисекундах
     */
    timeout?: number;
    /**
     * HTTP метод (GET, POST и т.д.)
     */
    method?: string;
    /**
     * Тело запроса
     */
    body?: BodyInit | null;
    /**
     * Режим обработки куки и авторизации (omit, same-origin, include)
     */
    credentials?: RequestCredentials;
    /**
     * Создает экземпляр ApiRequest.
     * @param initialConfig - Начальная конфигурация запроса.
     */
    constructor(initialConfig?: IApiRequestConfig);
    /**
     * Добавляет значение к существующему заголовку или создает новый.
     * @param headerName - Имя заголовка.
     * @param headerValue - Значение заголовка.
     * @returns Текущий экземпляр класса для цепочки вызовов.
     */
    addHeader(headerName: string, headerValue: string): this;
    /**
     * Полностью удаляет заголовок из запроса.
     * @param headerName - Имя заголовка для удаления.
     * @returns Текущий экземпляр класса.
     */
    removeHeader(headerName: string): this;
    /**
     * Массово обновляет или устанавливает заголовки из объекта.
     * @param headers - Объект типа Record, где ключ — имя заголовка.
     * @returns Текущий экземпляр класса.
     */
    updateHeaders(headers: Record<string, string>): this;
    /**
     * Возвращает значение заголовка по имени.
     * @param headerName - Имя заголовка.
     * @returns Строку со значением или undefined, если заголовок отсутствует.
     */
    getHeader(headerName: string): string | undefined;
    /**
     * Проверяет, установлен ли указанный заголовок.
     * @param headerName - Имя заголовка.
     * @returns True, если заголовок существует.
     */
    hasHeader(headerName: string): boolean;
    /**
     * Устанавливает заголовок Content-Type.
     * @param contentType - Значение MIME-типа.
     * @returns Текущий экземпляр класса.
     */
    setContentType(contentType: string): this;
    /**
     * Устанавливает заголовок Content-Type в значение application/json.
     * @returns Текущий экземпляр класса.
     */
    setContentTypeApplicationJson(): this;
    /**
     * Устанавливает заголовок авторизации.
     * @param token - Токен доступа.
     * @param tokenType - Тип токена (по умолчанию 'Bearer').
     * @returns Текущий экземпляр класса.
     */
    setAuthorization(token: string, tokenType?: string): this;
    /**
     * Устанавливает политику передачи учетных данных (credentials).
     * @param credentials - Режим передачи (по умолчанию 'include').
     * @returns Текущий экземпляр класса.
     */
    setCredentials(credentials?: RequestCredentials): this;
    /**
     * Устанавливает тело запроса в формате JSON.
     * Автоматически преобразует объект в строку и устанавливает 'Content-Type: application/json'.
     * @param data - Данные для передачи в теле запроса (объект, массив и т.д.).
     * @returns Текущий экземпляр класса для цепочки вызовов.
     */
    setJsonBody(data: unknown): this;
    /**
     * Устанавливает HTTP метод GET.
     * @returns Текущий экземпляр класса.
     */
    asGet(): this;
    /**
     * Устанавливает HTTP метод POST.
     * @returns Текущий экземпляр класса.
     */
    asPost(): this;
    /**
     * Устанавливает HTTP метод PUT.
     * @returns Текущий экземпляр класса.
     */
    asPut(): this;
    /**
     * Устанавливает HTTP метод PATCH.
     * @returns Текущий экземпляр класса.
     */
    asPatch(): this;
    /**
     * Устанавливает HTTP метод DELETE.
     * @returns Текущий экземпляр класса.
     */
    asDelete(): this;
    /**
     * Устанавливает произвольный HTTP метод.
     * @param method - Название метода (напр. 'OPTIONS', 'HEAD').
     * @returns Текущий экземпляр класса.
     */
    setMethod(method: string): this;
    /**
     * Преобразует текущий объект в чистую конфигурацию IApiRequestConfig.
     * Используется для передачи результата в метод fetch.
     * @returns Объект конфигурации запроса.
     */
    toIApiRequestConfig(): IApiRequestConfig;
}
//# sourceMappingURL=ApiRequestConfig.d.ts.map