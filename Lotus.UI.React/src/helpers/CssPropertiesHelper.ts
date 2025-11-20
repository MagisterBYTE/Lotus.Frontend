import
  {
    IGeneralBackgroundProperties,
    IGeneralBorderProperties,
    IGeneralContainerProperties,
    IGeneralIconProperties,
    IGeneralMarginProperties,
    IGeneralPaddingProperties,
    IGeneralTextProperties
  } from '#base';
import { Theme } from '#theme';
import { TCssProperties } from '#types';
import { Assert } from 'lotus-core/utils';
import { CSSProperties } from 'react';

type TLotusCustomProps =
  | keyof IGeneralBackgroundProperties
  | keyof IGeneralBorderProperties
  | keyof IGeneralContainerProperties
  | keyof IGeneralMarginProperties
  | keyof IGeneralPaddingProperties
  | keyof IGeneralTextProperties
  | keyof IGeneralIconProperties;

export class CssPropertiesHelper
{
  // #region Common
  public static filterDOMProps<T extends Record<string, any>>(props: T): Omit<T, TLotusCustomProps>
  {
    const domProps: any = {};

    const nonDOMProps: TLotusCustomProps[] = [
      // IGeneralBackgroundProperties
      'backColor',
      'backImage',
      'shadow',

      // IGeneralBorderProperties
      'withBorder',
      'borderStyle',
      'borderWidth',
      'borderColor',
      'borderRadius',
      'borderRadiusTopLeft',
      'borderRadiusBottomLeft',
      'borderRadiusTopRight',
      'borderRadiusBottomRight',
      'borderShadow',

      // IGeneralContainerProperties
      'w',
      'h',
      'grow',
      'shrink',
      'gridColumn',
      'gridColumnSpan',
      'gridRow',
      'gridRowSpan',

      // IGeneralMarginProperties
      'm',
      'ml',
      'mt',
      'mr',
      'mb',

      // IGeneralPaddingProperties
      'p',
      'pl',
      'pt',
      'pr',
      'pb',

      // IGeneralTextProperties
      'fontSize',
      'fontBold',
      'fontAccent',
      'textEffect',
      'textAlign',
      'textColorHarmonious',
      'textColor',
      'textLineSpacing',

      // IGeneralIconProperties
      'icon',
      'iconSize',
      'iconStyle',
      'iconColor',
      'iconPlacement',
      'imageDatabase'
    ];

    for (const key in props)
    {
      if (!nonDOMProps.includes(key as TLotusCustomProps))
      {
        domProps[key] = props[key];
      }
    }

    return domProps;
  }

  public static overrideStyleValue<TKey extends keyof CSSProperties>(source: CSSProperties, key: TKey, value: CSSProperties[TKey], override: boolean)
  {
    if (Assert.existValue(value))
    {
      const currentValue = source[key];

      if (Assert.existValue(currentValue))
      {
        if (override)
        {
          source[key] = value;
        }
      } else
      {
        source[key] = value;
      }
    }
  }

  public static overrideStyle(source: CSSProperties, override: CSSProperties)
  {
    for (const key in override)
    {
      // @ts-expect-error prop
      const prop = override[key];
      // @ts-expect-error prop
      source[key] = prop;
    }

    // убираем общий свойства если установлены конкретные значения
    // borderRadius
    if (override.borderTopLeftRadius ?? override.borderTopRightRadius ?? override.borderBottomLeftRadius ?? override.borderBottomRightRadius)
    {
      source.borderRadius = undefined;
    }
  }
  // #endregion

  // #region TransitionColors
  /**
   * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
   * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
   */
  public static getTransitionColorsProps(): TCssProperties
  {
    return {
      transition: `background-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    };
  }
  // #endregion

  // #region TransformScale
  /**
   * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
   * @param scale Масштаб
   * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
   */
  public static getTransformScaleProps(scale?: number): TCssProperties
  {
    if (scale)
    {
      return { transform: `scale(${scale});` };
    }

    return {};
  }
  // #endregion
}
