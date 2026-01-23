/**
 * Проверка объекта на поддержку интерфейса {@link IChangeStateNotifier}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfChangeStateNotifier(value) {
    if (value && typeof value === 'object') {
        return 'onStateChanged' in value && typeof value.onStateChanged === 'function';
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IChangeStateNotifier}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToChangeStateNotifier(value) {
    if (instanceOfChangeStateNotifier(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=ChangeStateNotifier.js.map