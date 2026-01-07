import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';

/**
 * Цветовая схема
 */
export type TColorScheme = 'light' | 'dark';

/**
 * Массив цветовых схем
 */
export const TColorSchemes: readonly TColorScheme[] = ['light', 'dark'];

/**
 * Набор цветовых схем в виде опций
 */
export const ColorSchemeOptions:IOption<TColorScheme>[] = TColorSchemes.map((x) => 
{
  return {
    label: StringHelper.capitalizeFirstLetter(x),
    value: x
  };
});