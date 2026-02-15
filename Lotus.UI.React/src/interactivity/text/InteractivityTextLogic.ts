/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, ColorTokenHelper, TColorToken } from 'lotus-core/modules/color';
import { MaybeUndef } from 'lotus-core/types';
import { CssVariables } from '#designSystem/сssVariables';
import { TCssColor, TCssProperties } from '#types';
import { IEffectContextProps, TInteractivityState } from '../types';
import { TInteractivityTextType } from './InteractivityTextType';

type TColor = TCssColor|TColorToken;

/**
 * Класс для применения логики интерактивности к тексту элемента
 */
export abstract class InteractivityTextLogic
{
  /**
   * Построить свойства Css на основании контекста и указанного состояния элемента
   * @param element Элемент (его пропсы)
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns Свойства Css
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getEffectByState(element: any, state: TInteractivityState, context?: IEffectContextProps): TCssProperties
  {
    const textProps: TCssProperties = {};

    const backColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgColor');
    const textColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'textColor');
    const textHoverColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'textHoverColor');
    const textPressedColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'textPressedColor');

    switch (state)
    {
      case 'normal':
        {
          const color = textColor ?? CssVariables.TextColor;
          textProps.color = ColorCssHelper.getColor(color);
        } break;
      case 'hover':
        {
          const color = textHoverColor ?? ColorTokenHelper.next(textColor ?? backColor, -2) ?? CssVariables.TextColor;
          textProps.color = ColorCssHelper.getColor(color);
        } break;
      case 'pressed':
        {
          const color = textPressedColor ?? ColorTokenHelper.next(textColor ?? backColor, 2) ?? CssVariables.TextColor;
          textProps.color = ColorCssHelper.getColor(color);
        } break;
    }

    return textProps;
  }

  /**
   * Создать свойства Css 
   * @param element Элемент (его пропсы)
   * @param type Тии интерактивности фона
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns Свойства Css
   */
  public static createProperties(element: any, type: TInteractivityTextType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties
  {
    const textProps: TCssProperties = {};
    return InteractivityTextLogic.fillProperties(textProps, element, type, state, context);
  }

  /**
   * Заполнить указанные свойства Css 
   * @param target Свойства Css
   * @param element Элемент (его пропсы)
   * @param type Тип интерактивности текста
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns Свойства Css
   */
  // eslint-disable-next-line max-params
  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState, 
    context?: IEffectContextProps): TCssProperties
  {
    const backColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgColor');
    const textColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'textColor');

    switch (type)
    {
      case 'default':
        {
          target.color = InteractivityTextLogic.getEffectByState(element, state, context).color;
        } break;
  
      case 'background':
        {
          if (textColor)
          {
            target.color = InteractivityTextLogic.getEffectByState(element, state, context).color;
          }
          else
          {
            target.color = ColorCssHelper.getColorContrast(backColor ?? 'primary');
          }
        } break;
    }
  
    return target;
  }
}