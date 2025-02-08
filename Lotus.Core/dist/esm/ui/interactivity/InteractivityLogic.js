import { InteractivityBorderLogic } from './InteractivityBorder';
import { InteractivityBackgroundLogic } from './InteractivityBackground';
import { InteractivityTextLogic } from './InteractivityText';
/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export class InteractivityLogic {
    /**
     * Получить визуальный эффекты для фона элемента UI
     * @param model Модель применения визуальных эффектов к элементу UI
     * @param state Состояние интерактивности элемента UI
     * @param elem Интерактивный элемент
     * @param isSelected Контекст элемента UI для применения визуального эффекта
     * @returns Свойства CSSProperties
     */
    static getEffectProps(model, state, element, context) {
        const isSelected = Boolean(context?.isSelected);
        const isDisabled = Boolean(context?.isDisabled);
        const isFocused = Boolean(context?.isFocused);
        const hasRippleEffect = Boolean(context?.hasRippleEffect);
        const effectProps = {};
        switch (model) {
            case 'filled':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'maybe', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'outline':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'text':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'icon':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'invisible', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'element');
                            }
                            break;
                    }
                }
                break;
            case 'menu':
            case 'input':
                {
                    switch (state) {
                        case 'normal':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'normal', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'border');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'hover', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'border');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'pressed', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'border');
                            }
                            break;
                    }
                }
                break;
            case 'list':
                {
                    switch (state) {
                        case 'normal':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'normal', 'border');
                                }
                            }
                            break;
                        case 'hover':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'hover', 'border');
                                }
                            }
                            break;
                        case 'pressed':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'mandatory', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, model, 'initial', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, model, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, model, 'none', 'pressed', 'border');
                                }
                            }
                            break;
                    }
                }
                break;
        }
        return effectProps;
    }
}
