/**
 * Интерфейс для группирования объектов
 */
export interface IGrouping<TItem extends object = object> {
    /**
     * Ключ для группирования
     */
    groupKey: any;
    /**
     * Массив элементов
     */
    items: TItem[];
}
/**
 * Проверка объекта на поддержку интерфейса IGrouping
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfGrouping(value: unknown): value is IGrouping;
/**
 * Преобразование объекта к интерфейсу IGrouping
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToGrouping(value: unknown): IGrouping | undefined;
//# sourceMappingURL=Grouping.d.ts.map