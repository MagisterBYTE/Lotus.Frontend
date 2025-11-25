/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { MaybeUndef } from 'lotus-core/types';
import { hasBorderProperties } from '#base';
import { TInteractivityState } from '#interactivity';
import { ThemeInstance } from '#theme';
import { nextThemeColor, TThemeColor, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssBorderStyle, TCssBorderWidth, TCssProperties } from '#types';
import { TInteractivityBorderType } from './InteractivityBorderType';

export abstract class InteractivityBorderLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderProps: TCssProperties = {};

    const backColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'backColor');
    const borderColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'borderColor');
    const hoverBorderColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'hoverBorderColor');
    const pressedBorderColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'pressedBorderColor');

    switch (state)
    {
      case 'normal':
        {
          borderProps.borderColor = ThemeInstance.getColorByStructuralPart(part, borderColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
        } break;
      case 'hover':
        {
          borderProps.borderColor = ThemeInstance.getColorByStructuralPart(part, hoverBorderColor ??
            nextThemeColor(borderColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
        } break;
      case 'pressed':
        {
          borderProps.borderColor = ThemeInstance.getColorByStructuralPart(part, pressedBorderColor ??
            nextThemeColor(borderColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
        } break;
    }

    return borderProps;
  }

  // eslint-disable-next-line max-params
  public static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderProps: TCssProperties = {};

    return InteractivityBorderLogic.fillProperties(borderProps, element, type, state, part, actionType);
  }

  // eslint-disable-next-line max-params
  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const borderStyle: MaybeUndef<TCssBorderStyle> = ObjectHelper.getValue<MaybeUndef<TCssBorderStyle>>(element, 'borderStyle');
    const borderWidth: MaybeUndef<TCssBorderWidth> = ObjectHelper.getValue<MaybeUndef<TCssBorderWidth>>(element, 'borderWidth');
    const borderColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'borderColor');

    switch (type)
    {
      // Границы нет
      case 'none':
        {
          target.border = 'none';
          target.borderColor = 'transparent';
        } break;

      // Граница может быть
      case 'maybe':
        {
          if (hasBorderProperties(borderStyle, borderWidth, borderColor))
          {
            target.borderWidth = borderWidth ?? '1px';
            target.borderStyle = borderStyle ?? 'solid';
            target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
          }
          else
          {
            target.border = 'none';
            target.borderColor = 'transparent';
          }
        } break;

      // Граница не видна
      case 'invisible':
        {
          target.borderColor = 'transparent';
          target.borderWidth = borderWidth ?? '1px';
        } break;
      // Граница обязательна
      case 'mandatory':
        {
          target.borderWidth = borderWidth ?? '1px';
          target.borderStyle = borderStyle ?? 'solid';
          target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
        } break;
    }

    return target;
  }
}