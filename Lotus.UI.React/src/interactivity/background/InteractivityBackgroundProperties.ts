import { IGeneralBackgroundProperties } from "#base";
import { TThemeColor } from "#theme/types";

/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties
{
  /**
   * Цвет фона при наведении
   */
  hoverBackColor?: TThemeColor;

  /**
   * Цвет фона при нажатии
   */
  pressedBackColor?: TThemeColor;
}