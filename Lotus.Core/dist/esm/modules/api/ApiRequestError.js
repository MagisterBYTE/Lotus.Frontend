/**
 * Ошибка запроса
 */
export class ApiRequestError extends Error {
    response;
    request;
    code;
    config;
    constructor(message, responseData) {
        super(message);
        this.name = 'ApiRequestError';
        this.response = responseData;
        // Исправление прототипа для корректной работы instanceof в старых окружениях
        Object.setPrototypeOf(this, ApiRequestError.prototype);
    }
}
//# sourceMappingURL=ApiRequestError.js.map