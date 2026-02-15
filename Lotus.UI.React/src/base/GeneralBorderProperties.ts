import { NumberHelper } from 'lotus-core/helpers';
import { Color, ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { RadiusSizes } from '#designSystem/sizes';
import { CssVariables } from '#designSystem/сssVariables';
import {
  TBorderSideFlags,
  TCssBorderColor,
  TCssBorderRadius,
  TCssBorderStyle,
  TCssBorderWidth,
  TCssBoxShadow,
  TCssProperties,
  TShadowElevation,
  TSizeType
} from '#types';

/**
 * Общие свойства для границы элемента UI
 */
export interface IGeneralBorderProperties {
  /**
   * Статус наличия границы
   */
  withBorder?: boolean | number;

  /**
   * Тип стиля границы
   */
  bdStyle?: TCssBorderStyle;

  /**
   * Ширина границы
   */
  bdWidth?: TCssBorderWidth | number;

  /**
   * Цвет границы
   */
  bdColor?: TCssBorderColor | TColorToken;

  /**
   * Скругление границы
   */
  bdRadius?: TCssBorderRadius | TSizeType | true;

  /**
   * Скругление границы верхнего левого края
   */
  bdRadiusTopLeft?: TCssBorderRadius | TSizeType | true;

  /**
   * Скругление границы нижнего левого края
   */
  bdRadiusBottomLeft?: TCssBorderRadius | TSizeType | true;

  /**
   * Скругление границы верхнего правого края
   */
  bdRadiusTopRight?: TCssBorderRadius | TSizeType | true;

  /**
   * Скругление границы нижнего правого края
   */
  bdRadiusBottomRight?: TCssBorderRadius | TSizeType | true;

  /**
   * Размер тени границы
   */
  bdShadow?: TShadowElevation;
}

/**
 * Вспомогательный класс для работы с общими свойствами границы элемента UI
 */
export abstract class BorderPropertiesHelper 
{
  // #region Common
  /**
   * Проверка на наличие любой свойства из границ элемента UI
   * @param borderStyle Тип стиля границы
   * @param borderWidth Ширина границы
   * @param borderColor Цвет границы
   */
  public static hasBorderArgs(borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: string): boolean 
  {
    return !!borderStyle || !!borderWidth || !!borderColor;
  }

  /**
   * Проверка на наличие любой свойства из границ элемента UI
   * @param borderProps Общие свойства для границы элемента UI
   */
  public static hasBorderProps(borderProps: IGeneralBorderProperties): boolean 
  {
    return (
      !!borderProps.withBorder ||
      !!borderProps.bdStyle ||
      !!borderProps.bdWidth ||
      !!borderProps.bdColor ||
      !!borderProps.bdRadius ||
      !!borderProps.bdRadiusBottomLeft ||
      !!borderProps.bdRadiusBottomRight ||
      !!borderProps.bdRadiusTopLeft ||
      !!borderProps.bdRadiusTopRight
    );
  }

  /**
   * Проверка на наличие полных свойства радиуса из границ элемента UI
   * @param borderProps Общие свойства для границы элемента UI
   */
  public static hasNonShorthandBorderRadiusProps(borderProps: IGeneralBorderProperties): boolean 
  {
    return !!borderProps.bdRadiusBottomLeft || !!borderProps.bdRadiusBottomRight || !!borderProps.bdRadiusTopLeft || !!borderProps.bdRadiusTopRight;
  }
  // #endregion

  // #region Border
  /**
   * Создать свойства CSS по границе в виде TCssProperties
   * @param props Общие свойства для границы элемента UI
   * @returns Свойства CSS по границе в виде TCssProperties
   */
  public static createBorderProps(props: IGeneralBorderProperties): TCssProperties 
  {
    const borderProps: TCssProperties = {};

    if (BorderPropertiesHelper.hasBorderProps(props)) 
    {
      const color = BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor) ?? CssVariables.BorderColor;
      const style = props.bdStyle ?? 'solid';
      const width = BorderPropertiesHelper.getBorderWidthPropsValue(props.bdWidth) ?? CssVariables.BorderWidth;
      if (Assert.emptyValue(props.withBorder) || typeof props.withBorder === 'boolean') 
      {
        borderProps.borderColor = color;
        borderProps.borderStyle = style;
        borderProps.borderWidth = width;
      }
      else 
      {
        if (typeof props.withBorder === 'number') 
        {
          const isLeft = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Left);
          if (isLeft) 
          {
            borderProps.borderLeftColor = color;
            borderProps.borderLeftStyle = style;
            borderProps.borderLeftWidth = width;
          }
          const isRight = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Right);
          if (isRight) 
          {
            borderProps.borderRightColor = color;
            borderProps.borderRightStyle = style;
            borderProps.borderRightWidth = width;
          }
          const isTop = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Top);
          if (isTop) 
          {
            borderProps.borderTopColor = color;
            borderProps.borderTopStyle = style;
            borderProps.borderTopWidth = width;
          }
          const isBottom = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Bottom);
          if (isBottom) 
          {
            borderProps.borderBottomColor = color;
            borderProps.borderBottomStyle = style;
            borderProps.borderBottomWidth = width;
          }
        }
      }
      if (BorderPropertiesHelper.hasNonShorthandBorderRadiusProps(props)) 
      {
        borderProps.borderTopLeftRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusTopLeft);
        borderProps.borderTopRightRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusTopRight);
        borderProps.borderBottomLeftRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusBottomLeft);
        borderProps.borderBottomRightRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusBottomRight);
      }
      else 
      {
        borderProps.borderRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadius);
      }
    }

    return borderProps;
  }

  /**
   * Получить значение свойства CSS по цвету в виде TCssBorderRadius
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по цвету в виде TCssBorderRadius
   */
  public static getBorderColorPropsValue(value?: string): TCssBorderColor | undefined 
  {
    if (Assert.emptyValue(value)) return undefined;
    return ColorCssHelper.getColor(value);
  }

  /**
   * Получить значение свойства CSS по радиусу в виде TCssBorderRadius
   * @param designSystem Дизайн-система
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по радиусу в виде TCssBorderRadius
   */
  public static getBorderRadiusPropsValue(value?: TCssBorderRadius | TSizeType | true): TCssBorderRadius | undefined 
  {
    if (Assert.emptyValue(value)) return undefined;
    if (value === true) return CssVariables.BorderRadius;
    return RadiusSizes.getFromCssVariable(value);
  }

  /**
   * Получить значение свойства CSS по ширине границы в виде TCssBorderWidth
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по ширине границы в виде TCssBorderWidth
   */
  public static getBorderWidthPropsValue(value?: TCssBorderWidth | number): TCssBorderWidth | undefined 
  {
    if (Assert.emptyValue(value)) return undefined;

    if (typeof value === 'number') return `${value}px`;

    return value;
  }
  // #endregion

  // #region BorderShadow
  /**
   * Создать свойства CSS по границе тени в виде TCssProperties
   * @param props Общие свойства для границы элемента UI
   * @returns Свойства CSS по границе тени в виде TCssProperties
   */
  public static createBorderShadowProps(props: IGeneralBorderProperties): TCssProperties 
  {
    const borderProps: TCssProperties = {};
    const boxShadow = BorderPropertiesHelper.getBorderShadowPropsValue(props.bdShadow, props.bdColor);
    if (Assert.existValue(boxShadow)) 
    {
      borderProps.boxShadow = boxShadow;
    }

    return borderProps;
  }

  /**
   * Получить значение свойства CSS по тени границы в виде TCssBoxShadow
   * @param elevation Относительный размер тени
   * @param color Вариант цвета темы
   * @param shadowAlpha Альфа компонент цвета для тени
   * @returns Свойства CSS по тени границы в виде TCssBoxShadow
   */
  public static getBorderShadowPropsValue(elevation?: TShadowElevation, color?: string, shadowAlpha?: number): TCssBoxShadow | undefined 
  {
    if (Assert.emptyValue(elevation)) return undefined;

    if (Assert.emptyValue(color)) 
    {
      return `0px 0px ${elevation}px ${elevation}px ${CssVariables.BorderShadowColor}`;
    }
    else 
    {
      const colorShadow = new Color(ColorCssHelper.getColor(color));
      return `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha ?? 0.5)}`;
    }
  }
  // #endregion
}
