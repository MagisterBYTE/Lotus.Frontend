import { ThemeColorVariant } from '../theme/types';
import { TCssBackgroundImage, TShadowElevation } from '../types';


/**
 * Общие свойства для фона элемента UI
 */
export interface IGeneralBackgroundProperties
{
  /**
   * Основной цвет
   */
  backColor?: ThemeColorVariant;

  /**
   * Фоновое изображение
   */
  backImage?: TCssBackgroundImage;

  /**
   * Размер тени
   */
  shadowElevation?: TShadowElevation;
}