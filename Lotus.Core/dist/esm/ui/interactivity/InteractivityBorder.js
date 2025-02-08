/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHelper } from '../../helpers';
import { hasBorderProperties } from '../base';
import { ThemeColorVariantHelper, ThemePaletteHelper } from '../theme';
export class InteractivityBorderLogic {
    static getEffectByState(element, state, part, actionType) {
        const borderProps = {};
        const backColor = ObjectHelper.getValue(element, 'backColor');
        const borderColor = ObjectHelper.getValue(element, 'borderColor');
        const hoverBorderColor = ObjectHelper.getValue(element, 'hoverBorderColor');
        const pressedBorderColor = ObjectHelper.getValue(element, 'pressedBorderColor');
        switch (state) {
            case 'normal':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, borderColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, hoverBorderColor ??
                        ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    borderProps.borderColor = ThemePaletteHelper.getColorByStructuralPart(part, pressedBorderColor ??
                        ThemeColorVariantHelper.next(borderColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
        }
        return borderProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const borderProps = {};
        return InteractivityBorderLogic.fillProperties(borderProps, element, type, state, part, actionType);
    }
    static fillProperties(target, element, type, state, part, actionType) {
        const borderStyle = ObjectHelper.getValue(element, 'borderStyle');
        const borderWidth = ObjectHelper.getValue(element, 'borderWidth');
        const borderColor = ObjectHelper.getValue(element, 'borderColor');
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
                    if (hasBorderProperties(borderStyle, borderWidth, borderColor)) {
                        target.borderWidth = borderWidth ?? '1px';
                        target.borderStyle = borderStyle ?? 'solid';
                        target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
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
                    target.borderWidth = borderWidth ?? '1px';
                }
                break;
            // Граница обязательна
            case 'mandatory':
                {
                    target.borderWidth = borderWidth ?? '1px';
                    target.borderStyle = borderStyle ?? 'solid';
                    target.borderColor = InteractivityBorderLogic.getEffectByState(element, state, part, actionType).borderColor;
                }
                break;
        }
        return target;
    }
}
