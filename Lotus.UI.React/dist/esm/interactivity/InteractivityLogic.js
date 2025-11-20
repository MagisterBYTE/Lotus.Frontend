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
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'maybe', 'pressed', 'element');
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
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
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
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', 'element');
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
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'none', 'normal', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'invisible', 'normal', 'element');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'element');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'background', 'pressed', 'element');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'element');
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
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'normal', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'normal', 'border');
                            }
                            break;
                        case 'hover':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'hover', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'border');
                            }
                            break;
                        case 'pressed':
                            {
                                InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'pressed', 'background');
                                InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', 'text');
                                InteractivityBorderLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'border');
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
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'normal', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'normal', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'normal', 'border');
                                }
                            }
                            break;
                        case 'hover':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'hover', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'hover', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'hover', 'border');
                                }
                            }
                            break;
                        case 'pressed':
                            {
                                if (isSelected) {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'mandatory', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', 'border');
                                }
                                else {
                                    InteractivityBackgroundLogic.fillProperties(effectProps, element, 'initial', 'pressed', 'background');
                                    InteractivityTextLogic.fillProperties(effectProps, element, 'default', 'pressed', 'text');
                                    InteractivityBorderLogic.fillProperties(effectProps, element, 'none', 'pressed', 'border');
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
//# sourceMappingURL=InteractivityLogic.js.map