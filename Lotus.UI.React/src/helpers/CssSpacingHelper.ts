import { Assert } from 'lotus-core/utils';
import { IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { CssFontHelper, CssPropertiesHelper } from '#helpers';
import { instanceOfElementSpacing, TCssGap, TCssMargin, TCssPadding, TCssProperties, TElementSpacing } from '#types';

export abstract class CssSpacingHelper
{
  // #region Common
  /**
   * Конвертирует значение отступа в пиксели
   * @param spacing - размер отступа в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   * @returns число - размер в пикселях
   */
  public static getSpacingInPixels(spacing: TCssMargin | TCssPadding | TElementSpacing): number
  {
    if (typeof spacing === 'number')
    {
      return spacing; // предполагаем, что число уже в пикселях
    }

    if (instanceOfElementSpacing(spacing))
    {
      switch (spacing)
      {
        case 'xxs':
          return 0.5 * 16;
        case 'xs':
          return 0.75 * 16;
        case 'sm':
          return 0.875 * 16;
        case 'md':
          return 1 * 16;
        case 'lg':
          return 1.25 * 16;
        case 'xl':
          return 1.5 * 16;
        case 'xxl':
          return 2 * 16;
      }
    }

    const value = parseFloat(spacing);
    const unit = spacing.replace(value.toString(), '').toLowerCase();

    switch (unit)
    {
      case 'px':
        return value;
      case 'rem':
        return value * CssFontHelper.getRootFontSize();
      case 'em':
        // Для em нужно знать контекст, возвращаем приблизительное значение
        return value * 16; // предполагаем базовый размер 16px
      case 'pt':
        return value * 1.333; // 1pt = 1.333px
      case 'mm':
        return value * 3.7795; // 1mm = 3.7795px
      case 'cm':
        return value * 37.795; // 1cm = 37.795px
      case 'in':
        return value * 96; // 1inch = 96px
      case '%':
        return (value * 16) / 100; // предполагаем базовый размер 16px
      default:
        // Если единица не распознана, возвращаем как есть (предполагаем px)
        return value;
    }
  }
  // #endregion

  // #region Padding
  /**
   * Заполнить свойства CSS по внутреннему отступу в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства внутренних отступов элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
   */
  public static fillPaddingProps(style: TCssProperties, props: IGeneralPaddingProperties, override: boolean): TCssProperties
  {
    const padding = CssSpacingHelper.getPaddingPropsValue(props.p);
    if (padding)
    {
      CssPropertiesHelper.overrideStyleValue(style, 'padding', padding, override);
    }
    else
    {
      CssPropertiesHelper.overrideStyleValue(style, 'paddingLeft', CssSpacingHelper.getPaddingPropsValue(props.pl), override);
      CssPropertiesHelper.overrideStyleValue(style, 'paddingRight', CssSpacingHelper.getPaddingPropsValue(props.pr), override);
      CssPropertiesHelper.overrideStyleValue(style, 'paddingTop', CssSpacingHelper.getPaddingPropsValue(props.pt), override);
      CssPropertiesHelper.overrideStyleValue(style, 'paddingBottom', CssSpacingHelper.getPaddingPropsValue(props.pb), override);
    }
    return style;
  }

  /**
   * Получить свойства CSS по внутреннему отступу в виде TCssProperties
   * @param props Общие свойства внутренних отступов элемента UI
   * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
   */
  public static getPaddingProps(props: IGeneralPaddingProperties): TCssProperties
  {
    const paddingProps: TCssProperties = {};

    if (props.p)
    {
      paddingProps.padding = CssSpacingHelper.getPaddingPropsValue(props.p);
    }
    else
    {
      paddingProps.paddingLeft = CssSpacingHelper.getPaddingPropsValue(props.pl);
      paddingProps.paddingRight = CssSpacingHelper.getPaddingPropsValue(props.pr);
      paddingProps.paddingTop = CssSpacingHelper.getPaddingPropsValue(props.pt);
      paddingProps.paddingBottom = CssSpacingHelper.getPaddingPropsValue(props.pb);
    }

    return paddingProps;
  }

  /**
   * Получить значение свойства CSS по внутреннему отступу в виде TCssPadding
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по внутреннему отступу в виде TCssPadding
   */
  public static getPaddingPropsValue(value?: TCssPadding | TElementSpacing): TCssPadding | undefined
  {
    if (Assert.emptyValue(value)) return undefined;
    if (instanceOfElementSpacing(value))
    {
      switch (value)
      {
        case 'xxs':
          return '0.5rem';
        case 'xs':
          return '0.625rem';
        case 'sm':
          return '0.75rem';
        case 'md':
          return '1rem';
        case 'lg':
          return '1.25rem';
        case 'xl':
          return '1.5rem';
        case 'xxl':
          return '2rem';
      }
    }

    return value;
  }
  // #endregion

  // #region Margin
  /**
   * Заполнить свойства CSS по внешнему отступу в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства внешних отступов элемента UI
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по внешнему отступу в виде TCssProperties
   */
  public static fillMarginProps(style: TCssProperties, props: IGeneralMarginProperties, override: boolean): TCssProperties
  {
    const margin = CssSpacingHelper.getMarginPropsValue(props.m);
    if (margin)
    {
      CssPropertiesHelper.overrideStyleValue(style, 'margin', margin, override);
    }
    else
    {
      CssPropertiesHelper.overrideStyleValue(style, 'marginLeft', CssSpacingHelper.getMarginPropsValue(props.ml), override);
      CssPropertiesHelper.overrideStyleValue(style, 'marginRight', CssSpacingHelper.getMarginPropsValue(props.mr), override);
      CssPropertiesHelper.overrideStyleValue(style, 'marginTop', CssSpacingHelper.getMarginPropsValue(props.mt), override);
      CssPropertiesHelper.overrideStyleValue(style, 'marginBottom', CssSpacingHelper.getMarginPropsValue(props.mb), override);
    }
    return style;
  }

  /**
   * Получить свойства CSS по внешнему отступу в виде TCssProperties
   * @param props Общие свойства внутренних отступов элемента UI
   * @returns Свойства CSS по внешнему отступу в виде TCssProperties
   */
  public static getMarginProps(props: IGeneralMarginProperties): TCssProperties
  {
    const marginProps: TCssProperties = {};

    if (props.m)
    {
      marginProps.margin = CssSpacingHelper.getMarginPropsValue(props.m);
    }
    else
    {
      marginProps.marginLeft = CssSpacingHelper.getMarginPropsValue(props.ml);
      marginProps.marginRight = CssSpacingHelper.getMarginPropsValue(props.mr);
      marginProps.marginTop = CssSpacingHelper.getMarginPropsValue(props.mt);
      marginProps.marginBottom = CssSpacingHelper.getMarginPropsValue(props.mb);
    }

    return marginProps;
  }

  /**
   * Получить значение свойства CSS по внешнему отступу в виде TCssMargin
   * @param value Значение свойства CSS
   * @param negative Отрицательное значение свойства
   * @returns Значение свойства CSS по внешнему отступу в виде TCssMargin
   */
  public static getMarginPropsValue(value?: TCssMargin | TElementSpacing, negative?: boolean): TCssMargin | undefined
  {
    if (Assert.emptyValue(value)) return undefined;
    if (instanceOfElementSpacing(value))
    {
      switch (value)
      {
        case 'xxs':
          return negative ? '-0.5rem' : '0.5rem';
        case 'xs':
          return negative ? '-0.625rem' : '0.625rem';
        case 'sm':
          return negative ? '-0.75rem' : '0.75rem';
        case 'md':
          return negative ? '-1rem' : '1rem';
        case 'lg':
          return negative ? '-1.25rem' : '1.25rem';
        case 'xl':
          return negative ? '-1.5rem' : '1.5rem';
        case 'xxl':
          return negative ? '-2rem' : '2rem';
      }
    }

    return value;
  }
  // #endregion

  // #region Gap
  /**
   * Получить значение свойства CSS по отступу в виде TCssGap
   * @param value Значение свойства CSS
   * @returns Значение свойства CSS по отступу в виде TCssGap
   */
  public static getGapPropsValue(value?: TCssGap | TElementSpacing): TCssGap | undefined
  {
    if (Assert.emptyValue(value)) return undefined;
    if (instanceOfElementSpacing(value))
    {
      switch (value)
      {
        case 'xxs':
          return '0.5rem';
        case 'xs':
          return '0.625rem';
        case 'sm':
          return '0.75rem';
        case 'md':
          return '1rem';
        case 'lg':
          return '1.25rem';
        case 'xl':
          return '1.5rem';
        case 'xxl':
          return '1.5rem';
      }
    }

    return value;
  }
  // #endregion
}
