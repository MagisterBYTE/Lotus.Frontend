/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from 'lotus-core/helpers';
import { ThemeInstance } from '#theme';
import { nextThemeColor } from '#theme/types';
export class InteractivityBackgroundLogic {
    static getEffectByState(element, state, part, actionType) {
        const backProps = {};
        const backColor = ObjectHelper.getValue(element, 'backColor');
        const hoverBackColor = ObjectHelper.getValue(element, 'hoverBackColor');
        const pressedBackColor = ObjectHelper.getValue(element, 'pressedBackColor');
        switch (state) {
            case 'normal':
                {
                    backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, hoverBackColor ??
                        nextThemeColor(backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    backProps.backgroundColor = ThemeInstance.getColorByStructuralPart(part, pressedBackColor ??
                        nextThemeColor(backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
        }
        return backProps;
    }
    // eslint-disable-next-line max-params
    static getProperties(element, type, state, part, actionType) {
        const backProps = {};
        return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, part, actionType);
    }
    // eslint-disable-next-line max-params
    static fillProperties(target, element, type, state, part, actionType) {
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
                    target.backgroundColor = InteractivityBackgroundLogic.getEffectByState(element, state, part, actionType).backgroundColor;
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityBackgroundLogic.js.map