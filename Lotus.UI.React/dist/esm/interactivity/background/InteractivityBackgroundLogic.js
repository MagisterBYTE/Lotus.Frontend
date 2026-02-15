/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ColorCssHelper, ColorTokenHelper } from 'lotus-core/modules/color';
import { CssVariables } from '#designSystem/сssVariables';
/**
 * Класс для применения логики интерактивности к фону элемента
 */
export class InteractivityBackgroundLogic {
    /**
     * Построить свойства Css на основании контекста и указанного состояния элемента
     * @param element Элемент (его пропсы)
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns Свойства Css
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static buildEffectByState(element, state, context) {
        const backProps = {};
        const backColor = ObjectHelper.getValue(element, 'bgColor');
        const backHoverColor = ObjectHelper.getValue(element, 'bgHoverColor');
        const backPressedColor = ObjectHelper.getValue(element, 'bgPressedColor');
        switch (state) {
            case 'normal':
                {
                    const color = backColor ?? CssVariables.PrimaryColor5;
                    backProps.backgroundColor = ColorCssHelper.getColor(color);
                }
                break;
            case 'hover':
                {
                    const color = backHoverColor ?? ColorTokenHelper.next(backColor, -2) ?? CssVariables.PrimaryColor3;
                    backProps.backgroundColor = ColorCssHelper.getColor(color);
                }
                break;
            case 'pressed':
                {
                    const color = backPressedColor ?? ColorTokenHelper.next(backColor, 2) ?? CssVariables.PrimaryColor7;
                    backProps.backgroundColor = ColorCssHelper.getColor(color);
                }
                break;
        }
        return backProps;
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
        const backProps = {};
        return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, context);
    }
    /**
     * Заполнить указанные свойства Css
     * @param target Свойства Css
     * @param element Элемент (его пропсы)
     * @param type Тии интерактивности фона
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns Свойства Css
     */
    // eslint-disable-next-line max-params
    static fillProperties(target, element, type, state, context) {
        switch (type) {
            case 'initial':
                {
                    target.backgroundColor = 'initial';
                }
                break;
            case 'none':
                {
                    target.backgroundColor = 'transparent';
                }
                break;
            case 'mandatory':
                {
                    target.backgroundColor = InteractivityBackgroundLogic.buildEffectByState(element, state, context).backgroundColor;
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityBackgroundLogic.js.map