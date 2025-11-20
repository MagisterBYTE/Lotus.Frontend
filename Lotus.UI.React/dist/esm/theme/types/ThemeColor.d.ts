import { IOption } from 'lotus-core/modules/option';
/**
 * Тип цвета темы
 */
export type TThemeColor = 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';
/**
 * Массив типов цветов
 */
export declare const TThemeColors: readonly TThemeColor[];
/**
 * Набор типов цветов в виде опций
 */
export declare const ThemeColorOptions: IOption[];
/**
 * Функция для проверки, является ли цвет типом цвета темы
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export declare function instanceOfThemeColor(color: any): color is TThemeColor;
//# sourceMappingURL=ThemeColor.d.ts.map