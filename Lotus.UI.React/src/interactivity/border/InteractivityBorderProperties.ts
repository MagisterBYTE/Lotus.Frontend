import { TColorToken } from 'lotus-core/modules/color';
import { IGeneralBorderProperties } from '#base';
import { TCssBorderColor } from '#types';

/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties
{
  /**
   * Цвет границы при наведении
   */
  bdHoverColor?: TCssBorderColor|TColorToken;

  /**
   * Цвет границы при нажатии
   */
  bdPressedColor?: TCssBorderColor|TColorToken;
}
