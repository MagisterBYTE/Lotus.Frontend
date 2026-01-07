/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, TColorToken, ColorTokenHelper } from 'lotus-core/modules/color';
import { MaybeUndef } from 'lotus-core/types';
import { CssVariables } from '#designSystem/сssVariables';
import { TCssBackgroundColor, TCssProperties } from '#types';
import { IEffectContextProps, TInteractivityState } from '../types';
import { TInteractivityBackgroundType } from './InteractivityBackgroundType';

type TColor = TCssBackgroundColor|TColorToken;

/**
 * Класс для применения логики интерактивности к фону элемента
 */
export abstract class InteractivityBackgroundLogic
{
  /**
   * Построить свойства Css на основании контекста и указанного состояния элемента
   * @param element Элемент (его пропсы)
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static buildEffectByState(element: any, state: TInteractivityState, context?: IEffectContextProps): TCssProperties
  {
    const backProps: TCssProperties = {};

    const backColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgColor');
    const backHoverColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgHoverColor');
    const backPressedColor: MaybeUndef<TColor> = ObjectHelper.getValue<MaybeUndef<TColor>>(element, 'bgPressedColor');

    switch (state)
    {
      case 'normal':
        {
          const color = backColor ?? CssVariables.PrimaryColor5;
          backProps.backgroundColor = ColorCssHelper.getColorCss(color);
        } break;
      case 'hover':
        {
          const color = backHoverColor ?? ColorTokenHelper.next(backColor, -2) ?? CssVariables.PrimaryColor3;
          backProps.backgroundColor = ColorCssHelper.getColorCss(color);
        } break;
      case 'pressed':
        {
          const color = backPressedColor ?? ColorTokenHelper.next(backColor, 2) ?? CssVariables.PrimaryColor7;
          backProps.backgroundColor = ColorCssHelper.getColorCss(color);
        } break;
    }

    return backProps;
  }

  /**
   * Создать свойства Css 
   * @param element Элемент (его пропсы)
   * @param type Тии интерактивности фона
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns 
   */
  public static createProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties
  {
    const backProps: TCssProperties = {};
    return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, context);
  }

  /**
   * Заполнить указанные свойства Css 
   * @param target Свойства Css
   * @param element Элемент (его пропсы)
   * @param type Тии интерактивности фона
   * @param state Состояние интерактивности элемента UI
   * @param context Текущий контекст элемента
   * @returns 
   */
  // eslint-disable-next-line max-params
  public static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, 
    context?: IEffectContextProps): TCssProperties
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
          target.backgroundColor = InteractivityBackgroundLogic.buildEffectByState(element, state, context).backgroundColor;
        } break;
    }

    return target;
  }
}