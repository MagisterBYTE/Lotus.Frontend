/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCssProperties } from '#types';
import { IInteractivityElementProperties } from './InteractivityElement';
import { InteractivityBackgroundLogic } from './background';
import { InteractivityBorderLogic } from './border';
import { InteractivityTextLogic } from './text';
import { IEffectContextProps, TInteractivityModel, TInteractivityState } from './types';

/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export abstract class InteractivityLogic
{
  /**
   * Получить визуальный эффекты для фона элемента UI
   * @param model Модель применения визуальных эффектов к элементу UI
   * @param state Состояние интерактивности элемента UI
   * @param elem Интерактивный элемент
   * @param isSelected Контекст элемента UI для применения визуального эффекта
   * @returns Свойства CSSProperties
   */
  // eslint-disable-next-line complexity
  public static getEffectProps(model: TInteractivityModel, state: TInteractivityState, element: IInteractivityElementProperties, 
    context?: IEffectContextProps): TCssProperties
  {
    const isSelected: boolean = Boolean(context?.isSelected);
    const isDisabled: boolean = Boolean(context?.isDisabled);
    const isFocused: boolean = Boolean(context?.isFocused);
    const hasRippleEffect: boolean = Boolean(context?.hasRippleEffect);

    const effectProps: TCssProperties = {};

    switch (model)
    {
      case 'filled':
        {
          switch (state)
          {
            case 'normal':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'normal', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'normal', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'normal', context);
              }
              break;
            case 'hover':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'hover', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'hover', context);
              } break;
            case 'pressed':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'pressed', context);
              } break;
          }
        } break;
      case 'outline':
        {
          switch (state)
          {
            case 'normal':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'normal', context);
              } break;
            case 'hover':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'hover', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
              } break;
            case 'pressed':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
              } break;
          }
        } break;
      case 'text':
        {
          switch (state)
          {
            case 'normal':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', context);
              } break;
            case 'hover':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', context);
              } break;
            case 'pressed':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', context);
              } break;
          }
        } break;
      case 'icon':
        {
          switch (state)
          {
            case 'normal':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'invisible', 'normal', context);
              } break;
            case 'hover':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
              } break;
            case 'pressed':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
              } break;
          }
        } break;
      case 'menu':
      case 'input':
        {
          switch (state)
          {
            case 'normal':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'normal', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'normal', context);
              } break;
            case 'hover':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'hover', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
              } break;
            case 'pressed':
              {
                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'pressed', context);
                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', context);
                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
              } break;
          }
        } break;
      case 'list':
        {
          switch (state)
          {
            case 'normal':
              {
                if (isSelected)
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'normal', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', context);
                }
                else
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'normal', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', context);
                }
              } break;
            case 'hover':
              {
                if (isSelected)
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', context);
                }
                else
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'hover', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', context);
                }
              } break;
            case 'pressed':
              {
                if (isSelected)
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', context);
                }
                else
                {
                  InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'pressed', context);
                  InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', context);
                  InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', context);
                }
              } break;
          }
        } break;
    }

    return effectProps;
  }
}