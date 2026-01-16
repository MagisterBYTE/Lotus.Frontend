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
}
//# sourceMappingURL=RefreshProxy.d.ts.map