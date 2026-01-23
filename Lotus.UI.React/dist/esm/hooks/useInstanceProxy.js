import { useEffect, useMemo } from 'react';
import { useProxyObject } from './useProxyObject';
/**
 * Создает экземпляр, подписывает на прокси и очищает при уничтожении
 * @param factory — функция, возвращающая новый экземпляр класса
 * @param deps — массив зависимостей для пересоздания инстанса (опционально)
 * @returns Экземпляр класса с поддержкой прокси
 */
export function useInstanceProxy(factory, deps = []) {
    // Создаем инстанс
    const instance = useMemo(factory, deps);
    // Используем существующую логику прокси
    const proxy = useProxyObject({ object: instance });
    // Эффект для очистки
    useEffect(() => {
        return () => {
            if (typeof instance.destroy === 'function') {
                instance.destroy();
            }
        };
    }, [instance]); // Сработает при смене инстанса или unmount
    return proxy;
}
//# sourceMappingURL=useInstanceProxy.js.map