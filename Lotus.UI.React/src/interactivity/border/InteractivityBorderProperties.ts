import { IGeneralBorderProperties } from '#base';
import { TThemeColor } from '#theme/types';

/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties
{
  /**
   * Цвет границы при наведении
   */
  hoverBorderColor?: TThemeColor;

  /**
   * Цвет границы при нажатии
   */
  pressedBorderColor?: TThemeColor;
}
