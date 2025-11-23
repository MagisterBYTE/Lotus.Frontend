/**
 * Интерфейс для обновления прокси объекта
 */
export interface IRefreshProxy {
    onRefreshProxy: () => void;
}
/**
 * Базовый класс реализующий обновления прокси объекта
 */
export declare class RefreshProxy implements IRefreshProxy {
    onRefreshProxy: () => void;
    constructor();
    /**
     * Метод по умолчанию для обновления прокси объекта.
     * Служит как заглушка
     */
    defaultRefreshProxy(): void;
}
//# sourceMappingURL=RefreshProxy.d.ts.map