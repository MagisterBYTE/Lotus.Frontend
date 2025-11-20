import { ThemeConstant } from '#theme/constants';
import { Assert } from 'lotus-core/utils';
export class CssPropertiesHelper {
    static filterDOMProps(props) {
        const domProps = {};
        const nonDOMProps = [
            // IGeneralBackgroundProperties
            'backColor',
            'backImage',
            'shadow',
            // IGeneralBorderProperties
            'borderStyle',
            'borderWidth',
            'borderColor',
            'borderRadius',
            'borderRadiusTopLeft',
            'borderRadiusBottomLeft',
            'borderRadiusTopRight',
            'borderRadiusBottomRight',
            'borderShadow',
            // IGeneralContainerProperties
            'w',
            'h',
            'grow',
            'shrink',
            'gridColumn',
            'gridColumnSpan',
            'gridRow',
            'gridRowSpan',
            // IGeneralMarginProperties
            'm',
            'ml',
            'mt',
            'mr',
            'mb',
            // IGeneralPaddingProperties
            'p',
            'pl',
            'pt',
            'pr',
            'pb',
            // IGeneralTextProperties
            'fontBold',
            'fontAccent',
            'textEffect',
            'textAlign',
            'textColorHarmonious',
            'textColor'
        ];
        for (const key in props) {
            if (!nonDOMProps.includes(key)) {
                domProps[key] = props[key];
            }
        }
        return domProps;
    }
    static overrideStyleValue(source, key, value, override) {
        if (Assert.existValue(value)) {
            const currentValue = source[key];
            if (Assert.existValue(currentValue)) {
                if (override) {
                    source[key] = value;
                }
            }
            else {
                source[key] = value;
            }
        }
    }
    // #region Common
    static overrideStyle(source, override) {
        for (const key in override) {
            // @ts-expect-error prop
            const prop = override[key];
            // @ts-expect-error prop
            source[key] = prop;
        }
        // убираем общий свойства если установлены конкретные значения
        // borderRadius
        if (override.borderTopLeftRadius ?? override.borderTopRightRadius ?? override.borderBottomLeftRadius ?? override.borderBottomRightRadius) {
            source.borderRadius = undefined;
        }
    }
    // #endregion
    // #region Font
    /**
     * Получить свойства CSS по настройкам шрифта в виде TCssProperties
     * @param size Размере элемента UI
     * @param isBold Жирный шрифт
     * @param isFontAccent  Использовать шрифт для акцента внимания
     * @returns Свойства CSS по настройкам шрифта в виде TCssProperties
     */
    static getFontProps(size, isBold, isFontAccent) {
        const fontProps = {};
        if (isFontAccent) {
            fontProps.fontFamily = ThemeConstant.FontDefault;
        }
        else {
            fontProps.fontFamily = ThemeConstant.FontAccent;
        }
        if (size) {
            switch (size) {
                case 'smaller':
                    fontProps.fontSize = 'x-small';
                    break;
                case 'small':
                    fontProps.fontSize = 'small';
                    break;
                case 'medium':
                    fontProps.fontSize = 'medium';
                    break;
                case 'large':
                    fontProps.fontSize = 'large';
                    break;
            }
        }
        if (isBold) {
            fontProps.fontWeight = 'bold';
        }
        return fontProps;
    }
    // #endregion
    // #region TextEffect
    /**
     * Получить свойства CSS по эффектам текста в виде TCssProperties
     * @param size Размере элемента UI
     * @param effect Эффекты текста
     * @param textAlign Выравнивание текста по горизонтали внутри блока
     * @returns Свойства CSS по эффектам текста в виде TCssProperties
     */
    static getTextEffectProps(size, effect, textAlign) {
        const textProps = {};
        const getSizeShadow = () => {
            if (size) {
                switch (size) {
                    case 'smaller':
                        return 0.05;
                    case 'small':
                        return 0.07;
                    case 'medium':
                        return 0.085;
                    case 'large':
                        return 0.1;
                }
            }
            return 0.07;
        };
        const getSizeStroke = () => {
            if (size) {
                switch (size) {
                    case 'smaller':
                        return 0.4;
                    case 'small':
                        return 0.5;
                    case 'medium':
                        return 0.7;
                    case 'large':
                        return 1;
                }
            }
            return 0.5;
        };
        if (effect) {
            switch (effect) {
                case 'shadow':
                    {
                        const sizeShadow = getSizeShadow();
                        textProps.textShadow = `${sizeShadow}rem ${sizeShadow}rem 0 rgba(0, 0, 0, 0.15)`;
                    }
                    break;
                case 'stroke':
                    {
                        const sizeStroke = getSizeStroke();
                        textProps.WebkitTextStroke = `${sizeStroke}px black`;
                    }
                    break;
            }
        }
        if (textAlign) {
            textProps.textAlign = textAlign;
        }
        return textProps;
    }
    // #endregion
    // #region TransitionColors
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps() {
        return {
            transition: `background-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstant.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
        };
    }
    // #endregion
    // #region TransformScale
    /**
     * Получить свойства CSS по трансформации масштабирования в виде TCssProperties
     * @param scale Масштаб
     * @returns Свойства CSS трансформации масштабирования в виде TCssProperties
     */
    static getTransformScaleProps(scale) {
        if (scale) {
            return { transform: `scale(${scale});` };
        }
        return {};
    }
}
//# sourceMappingURL=CssPropertiesHelper.js.map