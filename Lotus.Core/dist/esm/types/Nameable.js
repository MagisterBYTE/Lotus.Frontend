/**
 * Проверка объекта на поддержку интерфейса INameable
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfNameable(value) {
    if (value && typeof value === 'object') {
        return ('name' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу INameable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToNameable(value) {
    if (instanceOfNameable(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Nameable.js.map