import { TColorSemantic, TColorVariantName } from 'lotus-core/modules/color';
import { TThemeColorPalette } from './ThemeColorPalette';
/**
 * Доступный цвет темы (может быть цветом темы палитры, семантическим цветом, в том числе с учетом вариативности)
 */
export type TThemeColor = `${TThemeColorPalette | TColorSemantic}${Capitalize<TColorVariantName>}` | TThemeColorPalette | TColorSemantic;
export type TThemeColorTupleSemantic = {
    colorSemantic: TColorSemantic;
    colorPalette?: never;
    colorVariant?: TColorVariantName;
};
export type TThemeColorTuplePalette = {
    colorSemantic?: never;
    colorPalette: TThemeColorPalette;
    colorVariant: TColorVariantName;
};
export type TThemeColorTuple = TThemeColorTupleSemantic | TThemeColorTuplePalette;
/**
 * Массив всех возможных типов TThemeColor
 * TColorSemantic типы расположены в начале массива
 */
export declare const TThemeColors: TThemeColor[];
/**
 * Функция для проверки, является ли цвет доступным цветом темы
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export declare function instanceOfThemeColor(color: unknown): color is TThemeColor;
/**
 * Создание вариант доступного цвета темы
 * @param color Тип цвета палитры или семантический тип цвета
 * @param colorVariant Именованный тип в вариативности цветов
 * @returns Доступный цвет темы
 */
export declare function createThemeColor(color: TThemeColorPalette | TColorSemantic, colorVariant: TColorVariantName): TThemeColor;
/**
 * Деконструкция доступного цвета темы
 * @param color Доступный цвет темы
 * @returns Соответствующий кортеж данных или undefined
 */
export declare function deconstructionThemeColor(color: unknown): TThemeColorTuple | undefined;
/**
 * Получить доступный цвета темы смещенный на указанную величину
 * @param color Доступный цвет темы
 * @returns Смещенный доступный цвет темы
 */
export declare function nextThemeColor(color: TThemeColor, delta?: number): TThemeColor;
//# sourceMappingURL=ThemeColor.d.ts.map