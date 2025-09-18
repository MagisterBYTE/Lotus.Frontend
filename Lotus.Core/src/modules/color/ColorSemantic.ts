/**
 * Смысловой тип цвета
 */
export type TColorSemantic = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

/**
 * Массив всех смысловых типов цвета
 */
export const TColorSemantics: readonly TColorSemantic[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];


/**
 * Функция для проверки, является ли значение смысловым типом цвета
 * @param value Проверяемое значение
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkOfColorSemantic(value: any): value is TColorSemantic 
{
  return TColorSemantics.includes(value);
}