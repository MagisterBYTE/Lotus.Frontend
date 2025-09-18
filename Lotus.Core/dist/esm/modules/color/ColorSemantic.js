/**
 * Массив всех смысловых типов цвета
 */
export const TColorSemantics = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
/**
 * Функция для проверки, является ли значение смысловым типом цвета
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfColorSemantic(value) {
    return TColorSemantics.includes(value);
}
//# sourceMappingURL=ColorSemantic.js.map