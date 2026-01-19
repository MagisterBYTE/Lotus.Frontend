/**
 * Утилита для проверки типа сетевой ошибки
 */
export class NetworkErrorUtils {
    /**
     * Проверяет, является ли ошибка проблемой соединения
     */
    static isNetworkError(error) {
        return error instanceof TypeError && error.message === 'Failed to fetch';
    }
    /**
     * Проверяет, вызвана ли ошибка таймаутом
     */
    static isTimeoutError(error) {
        return error.name === 'AbortError' || error.name === 'TimeoutError';
    }
}
//# sourceMappingURL=NetworkErrorUtils.js.map