import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfColorPalette(color: any): color is TColorPalette 
{
  if (typeof color === 'string')
  {
    return TColorPalettes.includes(color as TColorPalette);
  }
  return false;
}