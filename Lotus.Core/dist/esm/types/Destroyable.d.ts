/**
 *  Определение интерфейса для объектов реализующих понятие удаление
 */
export interface IDestroyable {
    /**
     * Метод для удаления объекта
     */
    destroy: () => void;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IDestroyable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfDestroyable(value: unknown): value is IDestroyable;
/**
 * Преобразование объекта к интерфейсу {@link IDestroyable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToDestroyable(value: unknown): IDestroyable | undefined;
//# sourceMappingURL=Destroyable.d.ts.map