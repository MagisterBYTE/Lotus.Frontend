import { ContentTypeConstants } from './ContentTypeConstants';
import { HeaderNamesConstants } from './HeaderNamesConstants';
/**
 * Класс-строитель для формирования конфигурации API запроса.
 * Реализует интерфейс IApiRequestConfig и предоставляет удобный API для модификации параметров.
 */
export class ApiRequestConfig {
    // #region Fields
    /**
     * Заголовки запроса
     */
    headers;
    /**
     * Таймаут запроса в миллисекундах
     */
    timeout;
    /**
     * HTTP метод (GET, POST и т.д.)
     */
    method;
    /**
     * Тело запроса
     */
    body;
    /**
     * Режим обработки куки и авторизации (omit, same-origin, include)
     */
    credentials;
    // #endregion
    /**
     * Создает экземпляр ApiRequest.
     * @param initialConfig - Начальная конфигурация запроса.
     */
    constructor(initialConfig = {}) {
        this.headers = new Headers(initialConfig.headers);
        this.timeout = initialConfig.timeout;
        this.method = initialConfig.method || 'GET';
        this.body = initialConfig.body;
        this.credentials = initialConfig.credentials;
    }
    /**
     * Добавляет значение к существующему заголовку или создает новый.
     * @param headerName - Имя заголовка.
     * @param headerValue - Значение заголовка.
     * @returns Текущий экземпляр класса для цепочки вызовов.
     */
    addHeader(headerName, headerValue) {
        this.headers.append(headerName, headerValue);
        return this;
    }
    /**
     * Полностью удаляет заголовок из запроса.
     * @param headerName - Имя заголовка для удаления.
     * @returns Текущий экземпляр класса.
     */
    removeHeader(headerName) {
        this.headers.delete(headerName);
        return this;
    }
    /**
     * Массово обновляет или устанавливает заголовки из объекта.
     * @param headers - Объект типа Record, где ключ — имя заголовка.
     * @returns Текущий экземпляр класса.
     */
    updateHeaders(headers) {
        Object.entries(headers).forEach(([name, value]) => {
            this.headers.set(name, value);
        });
        return this;
    }
    /**
     * Возвращает значение заголовка по имени.
     * @param headerName - Имя заголовка.
     * @returns Строку со значением или undefined, если заголовок отсутствует.
     */
    getHeader(headerName) {
        return this.headers.get(headerName) ?? undefined;
    }
    /**
     * Проверяет, установлен ли указанный заголовок.
     * @param headerName - Имя заголовка.
     * @returns True, если заголовок существует.
     */
    hasHeader(headerName) {
        return this.headers.has(headerName);
    }
    /**
     * Устанавливает заголовок Content-Type.
     * @param contentType - Значение MIME-типа.
     * @returns Текущий экземпляр класса.
     */
    setContentType(contentType) {
        this.headers.set(HeaderNamesConstants.ContentType, contentType);
        return this;
    }
    /**
     * Устанавливает заголовок Content-Type в значение application/json.
     * @returns Текущий экземпляр класса.
     */
    setContentTypeApplicationJson() {
        return this.setContentType(ContentTypeConstants.ApplicationJson);
    }
    /**
     * Устанавливает заголовок авторизации.
     * @param token - Токен доступа.
     * @param tokenType - Тип токена (по умолчанию 'Bearer').
     * @returns Текущий экземпляр класса.
     */
    setAuthorization(token, tokenType = 'Bearer') {
        this.headers.set(HeaderNamesConstants.Authorization, `${tokenType} ${token}`);
        return this;
    }
    /**
     * Устанавливает политику передачи учетных данных (credentials).
     * @param credentials - Режим передачи (по умолчанию 'include').
     * @returns Текущий экземпляр класса.
     */
    setCredentials(credentials = 'include') {
        this.credentials = credentials;
        return this;
    }
    /**
     * Устанавливает тело запроса в формате JSON.
     * Автоматически преобразует объект в строку и устанавливает 'Content-Type: application/json'.
     * @param data - Данные для передачи в теле запроса (объект, массив и т.д.).
     * @returns Текущий экземпляр класса для цепочки вызовов.
     */
    setJsonBody(data) {
        this.body = JSON.stringify(data);
        return this.setContentTypeApplicationJson();
    }
    /**
     * Устанавливает HTTP метод GET.
     * @returns Текущий экземпляр класса.
     */
    asGet() {
        this.method = 'GET';
        return this;
    }
    /**
     * Устанавливает HTTP метод POST.
     * @returns Текущий экземпляр класса.
     */
    asPost() {
        this.method = 'POST';
        return this;
    }
    /**
     * Устанавливает HTTP метод PUT.
     * @returns Текущий экземпляр класса.
     */
    asPut() {
        this.method = 'PUT';
        return this;
    }
    /**
     * Устанавливает HTTP метод PATCH.
     * @returns Текущий экземпляр класса.
     */
    asPatch() {
        this.method = 'PATCH';
        return this;
    }
    /**
     * Устанавливает HTTP метод DELETE.
     * @returns Текущий экземпляр класса.
     */
    asDelete() {
        this.method = 'DELETE';
        return this;
    }
    /**
     * Устанавливает произвольный HTTP метод.
     * @param method - Название метода (напр. 'OPTIONS', 'HEAD').
     * @returns Текущий экземпляр класса.
     */
    setMethod(method) {
        this.method = method.toUpperCase();
        return this;
    }
    /**
     * Преобразует текущий объект в чистую конфигурацию IApiRequestConfig.
     * Используется для передачи результата в метод fetch.
     * @returns Объект конфигурации запроса.
     */
    toIApiRequestConfig() {
        return {
            method: this.method,
            headers: this.headers,
            body: this.body,
            timeout: this.timeout,
            credentials: this.credentials
        };
    }
}
//# sourceMappingURL=ApiRequestConfig.js.map