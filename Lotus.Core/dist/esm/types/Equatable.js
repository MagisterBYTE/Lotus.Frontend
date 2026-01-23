/**
 * Проверка объекта на поддержку интерфейса {@link IEquatable}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfEquatable(value) {
    if (value && typeof value === 'object') {
        return 'equal' in value && typeof value.equal === 'function';
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IEquatable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToEquatable(value) {
    if (instanceOfEquatable(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Equatable.js.map