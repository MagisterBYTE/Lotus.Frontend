/**
 * Проверка объекта на поддержку интерфейса {@link IResult}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfResult(value) {
    if (value && typeof value === 'object') {
        return ('succeeded' in value && typeof value.succeeded === 'boolean');
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
/**
 * Создает объекта {@link IResult} из объекта ошибки Error
 * @param error Ошибка
 * @param code Код
 * @returns Объект {@link IResult}
 */
export function createResultFromError(error, code = 'INTERNAL_ERROR') {
    return {
        succeeded: false,
        code: code,
        message: error.message,
        // Запихиваем стек в data, предварительно превратив его в массив строк для красоты
        data: {
            stack: error.stack ? error.stack.split('\n').map(line => line.trim()) : undefined,
            name: error.name
        }
    };
}
//# sourceMappingURL=Result.js.map