/**
 * Проверка объекта на поддержку интерфейса IResult
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfResult(value) {
    if (value && typeof value === "object") {
        return ('succeeded' in value) && ('code' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IResult
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function castToResult(value) {
    if (instanceOfResult(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}
//# sourceMappingURL=Result.js.map