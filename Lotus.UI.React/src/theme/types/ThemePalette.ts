import { TColorSemantic } from 'lotus-core/modules/color';
import { TThemeColorMode } from './ThemeColorMode';
import { TThemeColorPalette } from './ThemeColorPalette';
import { IThemePaletteAction, IThemePaletteBackground, IThemePaletteBorder, IThemePaletteColor, IThemePaletteText } from './ThemePaletteTypes';

/**
 * Палитра цвета
 * Палитра цвета определяет унифицированы цвета адаптированные для соответствующей темы
 */
export interface IThemePalette
{
  /**
   * Тема
   */
  mode:TThemeColorMode;

  /**
   * Цвета текста
   */
  text: IThemePaletteText;

  /**
   * Цвета фона
   */
  background: IThemePaletteBackground;

  /**
   * Цвет границ и разделителя
   */
  border: IThemePaletteBorder

  /**
   * Модификаторы прозрачности для цветов
   */
  action: IThemePaletteAction;

  /**
   * Массив цветов
   */
  colors: Record<TThemeColorPalette|TColorSemantic, IThemePaletteColor>; 
}