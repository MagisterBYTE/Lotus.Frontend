import type { IRefreshProxy } from 'lotus-core/modules/refreshProxy';
import { IDestroyable } from 'lotus-core/types';
import { useEffect, useMemo } from 'react';
import { useProxyObject } from './useProxyObject';

type TProxyInstance = IRefreshProxy & Partial<IDestroyable>;

/**
 * Создает экземпляр, подписывает на прокси и очищает при уничтожении
 * @param factory — функция, возвращающая новый экземпляр класса
 * @param deps — массив зависимостей для пересоздания инстанса (опционально)
 * @returns Экземпляр класса с поддержкой прокси
 */
export function useInstanceProxy<TType extends TProxyInstance>(factory: () => TType, deps: unknown[] = []): TType 
{
  // Создаем инстанс
  const instance = useMemo(factory, deps);

  // Используем существующую логику прокси
  const proxy = useProxyObject({ object: instance });

  // Эффект для очистки
  useEffect(() => 
  {
    return () => 
    {
      if (typeof instance.destroy === 'function') 
      {
        instance.destroy();
      }
    };
  }, [instance]); // Сработает при смене инстанса или unmount

  return proxy;
}
