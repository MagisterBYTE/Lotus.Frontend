/**
 * Проверка объекта на поддержку интерфейса IIdentifierId
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfIdentifierId(value) {
    if (value && typeof value === 'object') {
        return ('id' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IIdentifierId
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToIdentifierId(value) {
    if (instanceOfIdentifierId(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=IdentifierId.js.map