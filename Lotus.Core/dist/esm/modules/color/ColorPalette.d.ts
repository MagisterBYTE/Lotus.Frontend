import { IOption } from '#modules/option';
/**
 * Палитра цветов
 */
export type TColorPalette = 'blue' | 'blueGray' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown' | 'gray' | 'dark';
/**
 * Массив цветов палитры
 */
export declare const TColorPalettes: readonly TColorPalette[];
/**
 * Набор цветов палитры в виде опций
 */
export declare const ColorPaletteOptions: IOption<TColorPalette>[];
/**
 * Функция для проверки, является ли цвет цветом палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export declare function instanceOfColorPalette(color: unknown): color is TColorPalette;
//# sourceMappingURL=ColorPalette.d.ts.map