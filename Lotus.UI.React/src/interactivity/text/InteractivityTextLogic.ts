import { TInteractivityState } from "#interactivity";
import { ThemeInstance } from "#theme";
import { nextThemeColor, TThemeColor, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from "#theme/types";
import { TCssProperties } from "#types";
import { ObjectHelper } from "lotus-core/helpers";
import { MaybeUndef } from "lotus-core/types";
import { TInteractivityTextType } from "./InteractivityTextType";


export abstract class InteractivityTextLogic
{
  public static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart,
    actionType?: TThemePaletteActionType): TCssProperties
  {
    const textProps: TCssProperties = {};

    const backColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'backColor');
    const textColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'textColor');
    const hoverTextColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'hoverTextColor');
    const pressedTextColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'pressedTextColor');

    switch (state)
    {
      case 'normal':
        {
          textProps.color = ThemeInstance.getColorByStructuralPart(part, textColor ?? backColor ?? 'primary', actionType).toCSSRgbValue()
        } break;
      case 'hover':
        {
          textProps.color = ThemeInstance.getColorByStructuralPart(part, hoverTextColor ??
            nextThemeColor(textColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue()
        } break;
      case 'pressed':
        {
          textProps.color = ThemeInstance.getColorByStructuralPart(part, pressedTextColor ??
            nextThemeColor(textColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue()
        } break;
    }

    return textProps;
  }

  public static getProperties(element: any, type: TInteractivityTextType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const textProps: TCssProperties = {};
    return InteractivityTextLogic.fillProperties(textProps, element, type, state, part, actionType);
  }

  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState,
    part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties
  {
    const backColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'backColor');
    const textColor: MaybeUndef<TThemeColor> = ObjectHelper.getValue<MaybeUndef<TThemeColor>>(element, 'textColor');

    switch (type)
    {
      case 'default':
        {
          target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
        } break;
  
      case 'background':
        {
          if(textColor)
          {
            target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
          }
          else
          {
            target.color = ThemeInstance.getPaletteColor(backColor ?? 'primary')?.onText('main').toCSSRgbValue();
          }
        } break;
    }
  
    return target;
  }
}