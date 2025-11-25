/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ThemeInstance } from '#theme';
import { nextThemeColor } from '#theme/types';
export class InteractivityTextLogic {
    static getEffectByState(element, state, part, actionType) {
        const textProps = {};
        const backColor = ObjectHelper.getValue(element, 'backColor');
        const textColor = ObjectHelper.getValue(element, 'textColor');
        const hoverTextColor = ObjectHelper.getValue(element, 'hoverTextColor');
        const pressedTextColor = ObjectHelper.getValue(element, 'pressedTextColor');
        switch (state) {
            case 'normal':
                {
                    textProps.color = ThemeInstance.getColorByStructuralPart(part, textColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    textProps.color = ThemeInstance.getColorByStructuralPart(part, hoverTextColor ??
                        nextThemeColor(textColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    textProps.color = ThemeInstance.getColorByStructuralPart(part, pressedTextColor ??
                        nextThemeColor(textColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
        }
        return textProps;
    }
    // eslint-disable-next-line max-params
    static getProperties(element, type, state, part, actionType) {
        const textProps = {};
        return InteractivityTextLogic.fillProperties(textProps, element, type, state, part, actionType);
    }
    // eslint-disable-next-line max-params
    static fillProperties(target, element, type, state, part, actionType) {
        const backColor = ObjectHelper.getValue(element, 'backColor');
        const textColor = ObjectHelper.getValue(element, 'textColor');
        switch (type) {
            case 'default':
                {
                    target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
                }
                break;
            case 'background':
                {
                    if (textColor) {
                        target.color = InteractivityTextLogic.getEffectByState(element, state, part, actionType).color;
                    }
                    else {
                        target.color = ThemeInstance.getPaletteColor(backColor ?? 'primary')?.onText('main').toCSSRgbValue();
                    }
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityTextLogic.js.map