/**
 * Проверка объекта на поддержку интерфейса IEditable
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfEditable(value) {
    if (value && typeof value === "object") {
        return ('id' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IEditable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function castToEditable(value) {
    if (instanceOfEditable(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}
//# sourceMappingURL=Editable.js.map