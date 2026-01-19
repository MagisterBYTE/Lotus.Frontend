import { instanceOfResult } from '#types';
/**
 * Проверка объекта на поддержку интерфейса {@link IResponsePage}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfResponsePage(value) {
    if (value && typeof value === 'object') {
        return ('result' in value && instanceOfResult(value['result']) && 'payload' in value && Array.isArray(value['payload']) && 'pageInfo' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IResponsePage}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToResponsePage(value) {
    if (instanceOfResponsePage(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=ResponsePage.js.map