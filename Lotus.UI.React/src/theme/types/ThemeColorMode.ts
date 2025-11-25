import { StringHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';

/**
 * Режим темы
 */
export type TThemeColorMode = 'light' | 'dark';

/**
 * Массив режимов тем
 */
export const TThemeColorModes: readonly TThemeColorMode[] = ['light', 'dark'];

/**
 * Набор режимов тем в виде опций
 */
export const ThemeColorModeOptions:IOption<TThemeColorMode>[] = TThemeColorModes.map((x) => 
{
  return {
    label: StringHelper.capitalizeFirstLetter(x),
    value: x
  };
});