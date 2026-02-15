/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, ColorTokenHelper } from 'lotus-core/modules/color';
import { BorderPropertiesHelper } from '#base';
import { CssVariables } from '#designSystem/сssVariables';
/**
 * Класс для применения логики интерактивности к границе элемента
 */
export class InteractivityBorderLogic {
    /**
     * Построить свойства Css на основании контекста и указанного состояния элемента
     * @param element Элемент (его пропсы)
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns Свойства Css
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getEffectByState(element, state, context) {
        const borderProps = {};
        const backColor = ObjectHelper.getValue(element, 'bgColor');
        const borderColor = ObjectHelper.getValue(element, 'bdColor');
        const borderHoverColor = ObjectHelper.getValue(element, 'bdHoverColor');
        const borderPressedColor = ObjectHelper.getValue(element, 'bdPressedColor');
        switch (state) {
            case 'normal':
                {
                    const color = borderColor ?? backColor ?? CssVariables.BorderColor;
                    borderProps.borderColor = ColorCssHelper.getColor(color);
                }
                break;
            case 'hover':
                {
                    const color = borderHoverColor ?? ColorTokenHelper.next(borderColor ?? backColor, -2) ?? CssVariables.PrimaryColor3;
                    borderProps.borderColor = ColorCssHelper.getColor(color);
                }
                break;
            case 'pressed':
                {
                    const color = borderPressedColor ?? ColorTokenHelper.next(borderColor ?? backColor, 2) ?? CssVariables.PrimaryColor7;
                    borderProps.borderColor = ColorCssHelper.getColor(color);
                }
                break;
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
    static createProperties(element, type, state, context) {
        const borderProps = {};
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
    static fillProperties(target, element, type, state, context) {
        const borderStyle = ObjectHelper.getValue(element, 'bdStyle');
        const borderWidth = ObjectHelper.getValue(element, 'bdWidth');
        const borderColor = ObjectHelper.getValue(element, 'bdColor');
        switch (type) {
            // Границы нет
            case 'none':
                {
                    target.border = 'none';
                    target.borderColor = 'transparent';
                }
                break;
            // Граница может быть
            case 'maybe':
                {
                    if (BorderPropertiesHelper.hasBorderArgs(borderStyle, borderWidth, borderColor)) {
                        target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
                        target.borderStyle = borderStyle ?? 'solid';
                        target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, context).borderColor;
                    }
                    else {
                        target.border = 'none';
                        target.borderColor = 'transparent';
                    }
                }
                break;
            // Граница не видна
            case 'invisible':
                {
                    target.borderColor = 'transparent';
                    target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
                }
                break;
            // Граница обязательна
            case 'mandatory':
                {
                    target.borderWidth = borderWidth ?? CssVariables.BorderWidth;
                    target.borderStyle = borderStyle ?? 'solid';
                    target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, context).borderColor;
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityBorderLogic.js.map