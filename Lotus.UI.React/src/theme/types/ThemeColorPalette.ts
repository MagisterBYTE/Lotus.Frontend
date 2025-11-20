import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';

/**
 * Тип цвета палитры темы
 */
export type TThemeColorPalette = 'blue' | 'blueGrey' | 'indigo' | 'green' | 'teal' | 'yellow' | 'amber' | 'red' | 'brown';

/**
 * Массив типов цветов палитры
 */
export const TThemeColorPalettes: readonly TThemeColorPalette[] = ['blue', 'blueGrey', 'indigo', 'green', 'teal', 'yellow', 'amber', 'brown'];

/**
 * Набор типов цветов палитры в виде опций
 */
export const ThemeColorPaletteOptions:IOption<TThemeColorPalette>[] = TThemeColorPalettes.map((x) => 
{
  return {
    label: StringHelper.capitalizeFirstLetter(x),
    value: x
  }
})

/**
 * Функция для проверки, является ли цвет типом цвета палитры
 * @param color Проверяемый цвет
 * @returns Статус проверки
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfThemeColorPalette(color: any): color is TThemeColorPalette 
{
  if(typeof color === 'string')
  {
    return TThemeColorPalettes.includes(color as TThemeColorPalette);
  }
  return false;
}