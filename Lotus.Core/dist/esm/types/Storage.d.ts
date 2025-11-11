/**
 * Интерфейс Storage предоставляет доступ к механизму хранения данных
 * в браузере (sessionStorage и localStorage)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export interface IStorage {
    /**
     * Возвращает количество пар ключ-значение, хранящихся в объекте Storage
     * @readonly
     */
    readonly length: number;
    /**
     * Удаляет ВСЕ пары ключ-значение из хранилища
     * @method
     */
    clear(): void;
    /**
     * Возвращает значение по указанному ключу
     * @param key - имя ключа для поиска
     * @returns значение, соответствующее ключу, или null если ключ не найден
     */
    getItem(key: string): string | null;
    /**
     * Возвращает имя ключа по указанному индексу
     * @param index - числовой индекс (от 0 до length-1)
     * @returns имя ключа или null если индекс выходит за границы
     */
    key(index: number): string | null;
    /**
     * Удаляет пару ключ-значение по указанному ключу
     * @param key - имя ключа для удаления
     */
    removeItem(key: string): void;
    /**
     * Сохраняет пару ключ-значение в хранилище
     * @param key - имя ключа
     * @param value - значение для сохранения (будет преобразовано в строку)
     */
    setItem(key: string, value: string): void;
    /**
     * Позволяет обращаться к значениям как к свойствам объекта: storage[key]
     * @param key - имя ключа
     */
    [name: string]: any;
}
//# sourceMappingURL=Storage.d.ts.map