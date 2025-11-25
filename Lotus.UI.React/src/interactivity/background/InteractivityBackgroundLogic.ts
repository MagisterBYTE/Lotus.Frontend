/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObjectHelper } from 'lotus-core/helpers';
import { MaybeUndef } from 'lotus-core/types';
import { TInteractivityState } from '#interactivity';
import { ThemeInstance } from '#theme';
import { nextThemeColor, TThemeColor, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityBackgroundType } from './InteractivityBackgroundType';


export abstract class InteractivityBackgroundLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const backProps: TCssProperties = {};

    const backColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'backColor');
    const hoverBackColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'hoverBackColor');
    const pressedBackColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'pressedBackColor');

    switch (state)
    {
      case 'normal':
        {
          backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, backColor ?? 'primary', actionType).toCSSRgbValue();
        } break;
      case 'hover':
        {
          backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, hoverBackColor ??
            nextThemeColor(backColor ?? 'primary', -2), actionType).toCSSRgbValue();
        } break;
      case 'pressed':
        {
          backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, pressedBackColor ??
            nextThemeColor(backColor ?? 'primary', 2), actionType).toCSSRgbValue();
        } break;
    }

    return backProps;
  }

  // eslint-disable-next-line max-params
  public static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const backProps: TCssProperties = {};

    return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, part, actionType);
  }

  // eslint-disable-next-line max-params
  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    switch (type)
    {
      case 'initial':
        {
          target.backgroundColor = 'initial';
        } break;

      case 'none':
        {
          target.backgroundColor = 'transparent';
        } break;
      case 'mandatory':
        {
          target.backgroundColor = InteractivityBackgroundLogic.getEffectByState(element, state, part, actionType).backgroundColor;
        } break;
    }

    return target;
  }
}