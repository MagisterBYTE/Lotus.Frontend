import { ThemeColorVariantHelper, ThemePaletteHelper } from '#theme/helpers';
import { ObjectHelper } from 'lotus-core/helpers';
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
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, textColor ?? backColor ?? 'primary', actionType).toCSSRgbValue();
                }
                break;
            case 'hover':
                {
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, hoverTextColor ??
                        ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', 2), actionType).toCSSRgbValue();
                }
                break;
            case 'pressed':
                {
                    textProps.color = ThemePaletteHelper.getColorByStructuralPart(part, pressedTextColor ??
                        ThemeColorVariantHelper.next(textColor ?? backColor ?? 'primary', -2), actionType).toCSSRgbValue();
                }
                break;
        }
        return textProps;
    }
    static getProperties(element, type, state, part, actionType) {
        const textProps = {};
        return InteractivityTextLogic.fillProperties(textProps, element, type, state, part, actionType);
    }
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
                        target.color = ThemePaletteHelper.getPaletteColor(backColor ?? 'primary')?.onText('main').toCSSRgbValue();
                    }
                }
                break;
        }
        return target;
    }
}
//# sourceMappingURL=InteractivityText.js.map