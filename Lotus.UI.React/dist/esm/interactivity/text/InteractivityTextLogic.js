/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, ColorTokenHelper } from 'lotus-core/modules/color';
import { CssVariables } from '#designSystem/сssVariables';
/**
 * Класс для применения логики интерактивности к тексту элемента
 */
export class InteractivityTextLogic {
    /**
     * Построить свойства Css на основании контекста и указанного состояния элемента
     * @param element Элемент (его пропсы)
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns Свойства Css
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getEffectByState(element, state, context) {
        const textProps = {};
        const backColor = ObjectHelper.getValue(element, 'bgColor');
        const textColor = ObjectHelper.getValue(element, 'textColor');
        const textHoverColor = ObjectHelper.getValue(element, 'textHoverColor');
        const textPressedColor = ObjectHelper.getValue(element, 'textPressedColor');
        switch (state) {
            case 'normal':
                {
                    const color = textColor ?? CssVariables.TextColor;
                    textProps.color = ColorCssHelper.getColor(color);
                }
                break;
            case 'hover':
                {
                    const color = textHoverColor ?? ColorTokenHelper.next(textColor ?? backColor, -2) ?? CssVariables.TextColor;
                    textProps.color = ColorCssHelper.getColor(color);
                }
                break;
            case 'pressed':
                {
                    const color = textPressedColor ?? ColorTokenHelper.next(textColor ?? backColor, 2) ?? CssVariables.TextColor;
                    textProps.color = ColorCssHelper.getColor(color);
                }
                break;
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
    static createProperties(element, type, state, context) {
        const textProps = {};
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
    static fillProperties(target, element, type, state, context) {
        const backColor = ObjectHelper.getValue(element, 'bgColor');
        const textColor = ObjectHelper.getValue(element, 'textColor');
        switch (type) {
            case 'default':
                {
                    target.color = InteractivityTextLogic.getEffectByState(element, state, context).color;
                }
                break;
            case 'background':
                {
                    if (textColor) {
                        target.color = InteractivityTextLogic.getEffectByState(element, state, context).color;
                    }
                    else {
                        target.color = ColorCssHelper.getColorContrast(backColor ?? 'primary');
                    }
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityTextLogic.js.map