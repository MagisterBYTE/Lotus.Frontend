/**
 * Проверка объекта на поддержку интерфейса {@link IEntity}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfEntity(value) {
    if (value && typeof value === 'object') {
        return ('id' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IEntity}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToEntity(value) {
    if (instanceOfEntity(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Entity.js.map