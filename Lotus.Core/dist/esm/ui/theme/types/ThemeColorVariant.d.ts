import { TColorVariantName } from '../../../modules/color';
import { TThemeColor } from './ThemeColor';
/**
 * Вариант цвета темы
 */
export type ThemeColorVariant = `${TThemeColor}${Exclude<Capitalize<TColorVariantName>, 'Main'>}` | TThemeColor;
export type ThemeColorVariantUndef = ThemeColorVariant | undefined;
