/**
 * Проверка объекта на поддержку интерфейса {@link IHasRequiredOwner}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfHasRequiredOwner(value) {
    if (value && typeof value === 'object') {
        return 'owner' in value && typeof value.owner === 'object';
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу {@link IHasRequiredOwner}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToHasRequiredOwner(value) {
    if (instanceOfHasRequiredOwner(value)) {
        return value;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=HasOwner.js.map