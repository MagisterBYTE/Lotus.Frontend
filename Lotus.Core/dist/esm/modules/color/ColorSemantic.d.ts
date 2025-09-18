/**
 * Смысловой тип цвета
 */
export type TColorSemantic = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
/**
 * Массив всех смысловых типов цвета
 */
export declare const TColorSemantics: readonly TColorSemantic[];
/**
 * Функция для проверки, является ли значение смысловым типом цвета
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
export declare function checkOfColorSemantic(value: any): value is TColorSemantic;
//# sourceMappingURL=ColorSemantic.d.ts.map