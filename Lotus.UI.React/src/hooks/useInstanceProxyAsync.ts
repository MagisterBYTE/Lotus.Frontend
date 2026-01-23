/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
import { IDestroyable } from 'lotus-core/types';
import { useEffect, useState } from 'react';
import { useProxyObject } from './useProxyObject';

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
export function useInstanceProxyAsync<TType extends TProxyInstance>(factory: () => Promise<TType>, deps: any[] = []): [TType | undefined, boolean, any | undefined]
{
  const [instance, setInstance] = useState<TType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | undefined>(undefined);

  useEffect(() =>
  {
    let isCancelled = false;
    setIsLoading(true);
    setError(undefined);

    factory()
      .then((result) =>
      {
        if (isCancelled)
        {
          // Если зависимости изменились до завершения промиса, уничтожаем ненужный объект
          result.destroy?.();
          return;
        }
        setInstance(result);
        setIsLoading(false);
      })
      .catch((err) =>
      {
        if (!isCancelled)
        {
          setError(err);
          setIsLoading(false);
        }
      });

    return () =>
    {
      isCancelled = true;
      // При демонтаже или смене deps вызываем destroy у текущего инстанса
      if (instance)
      {
        instance.destroy?.();
      }
    };
  }, deps);

  /**
   * Интегрируем существующую логику прокси.
   * Если инстанса еще нет, передаем "заглушку", чтобы хук не упал.
   */
  const proxy = useProxyObject({
    object: instance ?? ({ onRefreshProxy: () => { } } as any)
  });

  return [instance ? proxy : null, isLoading, error];
}
