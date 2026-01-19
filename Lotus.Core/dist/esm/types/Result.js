/**
 * Проверка объекта на поддержку интерфейса {@link IResult}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfResult(value) {
    if (value && typeof value === 'object') {
        return ('succeeded' in value && typeof value['succeeded'] === 'boolean');
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IResult}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToResult(value) {
    if (instanceOfResult(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Result.js.map