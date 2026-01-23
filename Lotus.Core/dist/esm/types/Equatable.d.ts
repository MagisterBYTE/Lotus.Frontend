/**
 * Интерфейс для реализации сравнения объектов на равенство.
 */
export interface IEquatable<TType> {
    equal: (other: TType) => boolean;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IEquatable}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfEquatable<TDatasaveType extends object>(value: unknown): value is IEquatable<TDatasaveType>;
/**
 * Преобразование объекта к интерфейсу {@link IEquatable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToEquatable<TDatasaveType extends object>(value: unknown): IEquatable<TDatasaveType> | undefined;
//# sourceMappingURL=Equatable.d.ts.map