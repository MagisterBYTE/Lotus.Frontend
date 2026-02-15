/**
 * Проверка объекта на поддержку интерфейса {@link INotifyPropertyChanged}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfNotifyPropertyChanged(value) {
    if (value && typeof value === 'object') {
        return 'onPropertyChanged' in value && typeof value.onPropertyChanged === 'function';
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link INotifyPropertyChanged}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToNotifyPropertyChanged(value) {
    if (instanceOfNotifyPropertyChanged(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=NotifyPropertyChanged.js.map