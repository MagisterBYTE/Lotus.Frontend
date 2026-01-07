import { StringHelper } from '#helpers';
import { IOption } from '#modules/option';

/**
 * Палитра цветов
 */
export type TColorPalette = 'blue' | 'blueGray' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown' | 'gray' | 'dark';

/**
 * Массив цветов палитры
 */
export const TColorPalettes: readonly TColorPalette[] = ['blue', 'blueGray', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown', 'gray', 'dark'];

/**
 * Набор цветов палитры в виде опций
 */
export const ColorPaletteOptions:IOption<TColorPalette>[] = TColorPalettes.map((x) => 
{
  return {
    label: StringHelper.capitalizeFirstLetter(x),
    value: x
  };
});

/**
 * Функция для проверки, является ли цвет цветом палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
export function instanceOfColorPalette(color: unknown): color is TColorPalette 
{
  if (typeof color === 'string')
  {
    return TColorPalettes.includes(color as TColorPalette);
  }
  return false;
}