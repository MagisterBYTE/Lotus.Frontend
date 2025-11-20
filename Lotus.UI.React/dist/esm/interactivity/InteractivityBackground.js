/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemePaletteHelper, ThemeColorVariantHelper } from '#theme/helpers';
import { ObjectHelper } from 'lotus-core/helpers';
export class InteractivityBackgroundLogic {
    static getEffectByState(element, state, part, actionType) {
        const backProps = {};
        const backColor = ObjectHelper.getValue(element, 'backColor');
        const hoverBackColor = ObjectHelper.getValue(element, 'hoverBackColor');
        const pressedBackColor = ObjectHelper.getValue(element, 'pressedBackColor');
        switch (state) {
            case 'normal':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBackColor ??
                        ThemeColorVariantHelper.next(backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    backProps.backgroundColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBackColor ??
                        ThemeColorVariantHelper.next(backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
        }
        return backProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const backProps = {};
        return InteractivityBackgroundLogic.fillProperties(backProps, element, type, state, part, actionType);
    }
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
//# sourceMappingURL=InteractivityBackground.js.map