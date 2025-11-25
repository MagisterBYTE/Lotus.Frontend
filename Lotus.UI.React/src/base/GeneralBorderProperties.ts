import { TThemeColor } from '#theme/types';
import { TCssBorderRadius, TCssBorderStyle, TCssBorderWidth, TElementRadius, TShadowElevation } from '#types';

/**
 * Общие свойства для границы элемента UI
 */
export interface IGeneralBorderProperties
{
  /**
   * статус наличия границы
   */
  withBorder?: boolean;

  /**
   * Тип стиля границы
   */
  borderStyle?: TCssBorderStyle;

  /**
   * Ширина границы
   */
  borderWidth?: TCssBorderWidth | number;

  /**
   * Цвет границы
   */
  borderColor?: TThemeColor;

  /**
   * Скругление границы
   */
  borderRadius?: TCssBorderRadius | TElementRadius | true;

  /**
   * Скругление границы верхнего левого края
   */
  borderRadiusTopLeft?: TCssBorderRadius | TElementRadius | true;

  /**
   * Скругление границы нижнего левого края
   */
  borderRadiusBottomLeft?: TCssBorderRadius | TElementRadius | true;

  /**
   * Скругление границы верхнего правого края
   */
  borderRadiusTopRight?: TCssBorderRadius | TElementRadius | true;

  /**
   * Скругление границы нижнего правого края
   */
  borderRadiusBottomRight?: TCssBorderRadius | TElementRadius | true;

  /**
   * Размер тени границы
   */
  borderShadow?: TShadowElevation;
}

/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderStyle Тип стиля границы
 * @param borderWidth Ширина границы
 * @param borderColor Цвет границы
 */
export function hasBorderProperties(borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: TThemeColor): boolean
{
  return !!borderStyle || !!borderWidth || !!borderColor;
}

/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export function hasBorderProps(borderProps: IGeneralBorderProperties): boolean
{
  return (
    !!borderProps.withBorder ||
    !!borderProps.borderStyle ||
    !!borderProps.borderWidth ||
    !!borderProps.borderColor ||
    !!borderProps.borderRadius ||
    !!borderProps.borderRadiusBottomLeft ||
    !!borderProps.borderRadiusBottomRight ||
    !!borderProps.borderRadiusTopLeft ||
    !!borderProps.borderRadiusTopRight
  );
}

/**
 * Проверка на наличие полных свойства радиуса из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export function hasNonShorthandBorderRadiusProps(borderProps: IGeneralBorderProperties): boolean
{
  return (
    !!borderProps.borderRadiusBottomLeft || !!borderProps.borderRadiusBottomRight || !!borderProps.borderRadiusTopLeft || !!borderProps.borderRadiusTopRight
  );
}
