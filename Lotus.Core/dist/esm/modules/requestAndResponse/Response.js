import { instanceOfResult } from '#types';
/**
 * Проверка объекта на поддержку интерфейса {@link IResponse}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfResponse(value) {
    if (value && typeof value === 'object') {
        return ('result' in value && instanceOfResult(value['result']) && 'payload' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IResponse}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToResponse(value) {
    if (instanceOfResponse(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=Response.js.map