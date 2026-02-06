/**
 *  Определение интерфейса для объектов реализующих понятие имени
 */
export interface INameable {
    /**
     * Имя объекта
     */
    name: string;
}
/**
 * Проверка объекта на поддержку интерфейса {@link INameable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfNameable(value: unknown): value is INameable;
/**
 * Преобразование объекта к интерфейсу {@link INameable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToNameable(value: unknown): INameable | undefined;
//# sourceMappingURL=Nameable.d.ts.map