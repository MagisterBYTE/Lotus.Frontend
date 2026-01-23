/**
 * Проверка объекта на поддержку интерфейса {@link IDatasavable}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfDatasavable(value) {
    if (value && typeof value === 'object') {
        return 'toDatasave' in value && typeof value.toDatasave === 'function';
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IDatasavable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToDatasavable(value) {
    if (instanceOfDatasavable(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Datasavable.js.map