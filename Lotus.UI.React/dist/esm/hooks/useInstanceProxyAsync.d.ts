import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
import { IDestroyable } from 'lotus-core/types';
type TProxyInstance = IRefreshProxy & Partial<IDestroyable>;
/**
 * Хук для асинхронного создания экземпляра класса с поддержкой прокси-обновлений и автоматической очистки.
 *
 * @template TType - Тип создаваемого объекта, должен реализовывать IRefreshProxy и опционально IDestroyable.
 *
 * @param {() => Promise<TType>} factory - Асинхронная функция-фабрика для создания экземпляра.
 * @param {any[]} [deps=[]] - Массив зависимостей, при изменении которых экземпляр будет пересоздан.
 *
 * @returns {[TType | undefined, boolean, Error | undefined]} Возвращает кортеж:
 * - `instance`: Проксированный экземпляр объекта или null, если загрузка еще идет.
 * - `isLoading`: Флаг процесса инициализации.
 * - `error`: Ошибка, если фабрика завершилась неудачно.
 *
 * @example
 * const [mapManager, isLoading, error] = useInstanceProxyAsync(async () => {
 *   const data = await Api.getMap(id);
 *   return new MapManager(data);
 * }, [id]);
 */
export declare function useInstanceProxyAsync<TType extends TProxyInstance>(factory: () => Promise<TType>, deps?: any[]): [TType | undefined, boolean, any | undefined];
export {};
//# sourceMappingURL=useInstanceProxyAsync.d.ts.map