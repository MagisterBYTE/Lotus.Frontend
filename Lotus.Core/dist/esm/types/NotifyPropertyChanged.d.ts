/**
 * Интерфейс для объектов, которые могут информировать об изменении свойства
 */
export interface INotifyPropertyChanged {
    /**
     * Метод реализующий информирование об изменении свойства
     * @param propertyName Имя свойства которого изменилось
     * @param sender Источник изменения
     */
    onPropertyChanged: (propertyName?: string, sender?: unknown) => void;
}
/**
 * Проверка объекта на поддержку интерфейса {@link INotifyPropertyChanged}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfNotifyPropertyChanged(value: unknown): value is INotifyPropertyChanged;
/**
 * Преобразование объекта к интерфейсу {@link INotifyPropertyChanged}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToNotifyPropertyChanged(value: unknown): INotifyPropertyChanged | undefined;
//# sourceMappingURL=NotifyPropertyChanged.d.ts.map