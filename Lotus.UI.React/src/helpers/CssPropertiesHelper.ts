/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from 'lotus-core/utils';
import { CSSProperties } from 'react';
import
{
  BackgroundPropertiesHelper,
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralBackgroundProperties,
  IGeneralBorderProperties,
  IGeneralContainerProperties,
  IGeneralIconProperties,
  IGeneralMarginProperties,
  IGeneralPaddingProperties,
  IGeneralTextProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper,
  TextPropertiesHelper
} from '#base';
import { DesignSystemConstants } from '#designSystem';
import { IEffectContextProps, IInteractivityElementProperties, InteractivityLogic, TInteractivityModel } from '#interactivity';
import { TCssProperties } from '#types';

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
  // eslint-disable-next-line complexity
  public static buildInteractivityElement(model: TInteractivityModel, props: IInteractivityElementProperties, 
    context?: IEffectContextProps): CSSProperties
  {
    const isDisabled: boolean = Boolean(context?.isDisabled);
    const isSelected: boolean = Boolean(context?.isSelected);
    const { 
      bgColor, 

      // @ts-expect-error hasScaleEffect
      hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect  
    } = props;

    return {
      cursor: 'pointer',
      display: 'inline-block',
      ...MarginPropertiesHelper.createMarginProps(props),
      ...PaddingPropertiesHelper.createPaddingProps(props),
      ...ContainerPropertiesHelper.createContainerProps(props),
      ...BorderPropertiesHelper.createBorderProps(props),
      ...TextPropertiesHelper.createTextProps(props),
      ...CssPropertiesHelper.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps(model, 'normal', props, context),
      ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: isSelected ? 8 : 2 }) : {}),
      ...((!isDisabled && hasShadowBorderEffect && isSelected) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
      ...((!isDisabled && hasScaleEffect && isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.2) : {}),

      // @ts-expect-error IInteractivityBackgroundEffect 
      '&:hover':
      {
        ...InteractivityLogic.getEffectProps(model, 'hover', props, context),
        ...((!isDisabled && hasShadowBoxEffect && !isSelected) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 4 }) : {}),
        ...((!isDisabled && hasShadowBorderEffect && !isSelected) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 4 }): {}),
        ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
      },
      '&:active':
      {
        ...InteractivityLogic.getEffectProps(model, 'pressed', props, context),
        ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 8 }) : {}),
        ...((!isDisabled && hasShadowBorderEffect) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
        ...((!isDisabled && hasScaleEffect && !isSelected) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
      },
      '&:checked':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, context),
        ...((!isDisabled && hasShadowBoxEffect) ? BackgroundPropertiesHelper.createBoxShadowProps({ bgColor: bgColor, bgShadow: 8 }) : {}),
        ...((!isDisabled && hasShadowBorderEffect) ? BorderPropertiesHelper.createBorderShadowProps({ bdColor: bgColor, bdShadow: 6 }) : {}),
        ...((!isDisabled && hasScaleEffect) ? CssPropertiesHelper.getTransformScaleProps(1.05) : {})
      },
      '&:disabled':
      {
        ...InteractivityLogic.getEffectProps(model, 'normal', props, context)
      }
    };
  }

  // #region Common
  public static filterDOMProps<T extends Record<string, any>>(props: T): Omit<T, TLotusCustomProps>
  {
    const domProps: any = {};

    const nonDOMProps: TLotusCustomProps[] = [
      // IGeneralBackgroundProperties
      'bgColor',
      'bgImage',
      'bgShadow',
      'bgAccent',

      // IGeneralBorderProperties
      'withBorder',
      'bdRadius',
      'bdWidth',
      'bdStyle',
      'bdColor',
      'bdRadius',
      'bdRadiusTopLeft',
      'bdRadiusBottomLeft',
      'bdRadiusTopRight',
      'bdRadiusBottomRight',
      'bdShadow',

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
      }
      else
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
      transition: `background-color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${DesignSystemConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
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
