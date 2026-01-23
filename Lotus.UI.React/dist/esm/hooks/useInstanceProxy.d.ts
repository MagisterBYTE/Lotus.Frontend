import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
import { IDestroyable } from 'lotus-core/types';
type TProxyInstance = IRefreshProxy & Partial<IDestroyable>;
/**
 * Создает экземпляр, подписывает на прокси и очищает при уничтожении
 * @param factory — функция, возвращающая новый экземпляр класса
 * @param deps — массив зависимостей для пересоздания инстанса (опционально)
 * @returns Экземпляр класса с поддержкой прокси
 */
export declare function useInstanceProxy<TType extends TProxyInstance>(factory: () => TType, deps?: unknown[]): TType;
export {};
//# sourceMappingURL=useInstanceProxy.d.ts.map