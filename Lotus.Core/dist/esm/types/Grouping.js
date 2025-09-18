/**
 * Проверка объекта на поддержку интерфейса IGrouping
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfGrouping(value) {
    if (value) {
        return ('groupKey' in value) && ('items' in value) && (Array.isArray(value['items']));
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IGrouping
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfGrouping(value) {
    if (checkOfGrouping(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}
//# sourceMappingURL=Grouping.js.map