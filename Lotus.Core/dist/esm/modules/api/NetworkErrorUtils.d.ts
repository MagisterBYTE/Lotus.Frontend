/**
 * Утилита для проверки типа сетевой ошибки
 */
export declare abstract class NetworkErrorUtils {
    /**
     * Проверяет, является ли ошибка проблемой соединения
     */
    static isNetworkError(error: unknown): boolean;
    /**
     * Проверяет, вызвана ли ошибка таймаутом
     */
    static isTimeoutError(error: Error): boolean;
}
//# sourceMappingURL=NetworkErrorUtils.d.ts.map