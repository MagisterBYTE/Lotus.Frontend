import { IOption } from 'lotus-core/modules/option';
/**
 * Тип цвета палитры темы
 */
export type TThemeColorPalette = 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';
/**
 * Массив типов цветов палитры
 */
export declare const TThemeColorPalettes: readonly TThemeColorPalette[];
/**
 * Набор типов цветов палитры в виде опций
 */
export declare const ThemeColorPaletteOptions: IOption<TThemeColorPalette>[];
/**
 * Функция для проверки, является ли цвет типом цвета палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export declare function instanceOfThemeColorPalette(color: any): color is TThemeColorPalette;
//# sourceMappingURL=ThemeColorPalette.d.ts.map