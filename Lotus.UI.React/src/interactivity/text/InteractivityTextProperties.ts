import { TColorToken } from 'lotus-core/modules/color';
import { IGeneralTextProperties } from '#base';
import { TCssColor } from '#types';

/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityTextProperties extends IGeneralTextProperties
{
  /**
   * Цвет текста при наведении
   */
  textHoverColor?: TCssColor|TColorToken;

  /**
   * Цвет текста при нажатии
   */
  textPressedColor?: TCssColor|TColorToken;
}