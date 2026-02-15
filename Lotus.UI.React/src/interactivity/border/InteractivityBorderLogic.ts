/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, ColorTokenHelper, TColorToken } from 'lotus-core/modules/color';
import { MaybeUndef } from 'lotus-core/types';
import { BorderPropertiesHelper } from '#base';
import { CssVariables } from '#designSystem/сssVariables';
import { TCssBorderColor, TCssBorderStyle, TCssBorderWidth, TCssProperties } from '#types';
import { IEffectContextProps, TInteractivityState } from '../types';
import { TInteractivityBorderType } from './InteractivityBorderType';

type TColor = TCssBorderColor|TColorToken;

/**
 * Класс для применения логики интерактивности к границе элемента
 */
export abstract class InteractivityBorderLogic
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
    const borderProps: TCssProperties = {};

    const backColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgColor');
    const borderColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bdColor');
    const borderHoverColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bdHoverColor');
    const borderPressedColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bdPressedColor');

    switch (state)
    {
      case 'normal':
        {
          const color = borderColor ?? backColor ?? CssVariables.BorderColor;
          borderProps.borderColor = ColorCssHelper.getColor(color);
        } break;
      case 'hover':
        {
          const color = borderHoverColor ?? ColorTokenHelper.next(borderColor ?? backColor, -2) ?? CssVariables.PrimaryColor3;
          borderProps.borderColor = ColorCssHelper.getColor(color);
        } break;
      case 'pressed':
        {
          const color = borderPressedColor ?? ColorTokenHelper.next(borderColor ?? backColor, 2) ?? CssVariables.PrimaryColor7;
          borderProps.borderColor = ColorCssHelper.getColor(color);
        } break;
    }

    return borderProps;
  }

  /**
   * Создать свойства Css 
   * @param element Элемент (его пропсы)
   * @param type Тии интерактивности фона
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns Свойства Css
   */
  public static createProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties
  {
    const borderProps: TCssProperties = {};

    return InteractivityBorderLogic.fillProperties(borderProps, element, type, state, context);
  }

  /**
   * Заполнить указанные свойства Css 
   * @param target Свойства Css
   * @param element Элемент (его пропсы)
   * @param type Тип интерактивности границы
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns Свойства Css
   */
  // eslint-disable-next-line max-params
  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, 
    context?: IEffectContextProps): TCssProperties
  {
    const borderStyle: MaybeUndef<TCssBorderStyle> = ObjectHelper.getValue<MaybeUndef<TCssBorderStyle>>(element, 'bdStyle');
    const borderWidth: MaybeUndef<TCssBorderWidth> = ObjectHelper.getValue<MaybeUndef<TCssBorderWidth>>(element, 'bdWidth');
    const borderColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bdColor');

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
          if (BorderPropertiesHelper.hasBorderArgs(borderStyle, borderWidth, borderColor))
          {
            target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
            target.borderStyle = borderStyle ?? 'solid';
            target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, context).borderColor;
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
          target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
        } break;
      // Граница обязательна
      case 'mandatory':
        {
          target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
          target.borderStyle = borderStyle ?? 'solid';
          target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, context).borderColor;
        } break;
    }

    return target;
  }
}