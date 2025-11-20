import { TThemeColorMode } from './ThemeColorMode';
import { TThemeColorPalette } from './ThemeColorPalette';

/**
 * Данные темы
 */
export type TThemeData = 
{
  /**
   * Тема
   */
  mode: TThemeColorMode;
  
  /**
   * Основной цвет по умолчанию
   */
  color:TThemeColorPalette;
}