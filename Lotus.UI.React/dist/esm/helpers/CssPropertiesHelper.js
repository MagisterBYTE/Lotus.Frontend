/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from 'lotus-core/utils';
import { Theme } from '#theme';
export class CssPropertiesHelper {
    // #region Common
    static filterDOMProps(props) {
        const domProps = {};
        const nonDOMProps = [
            // IGeneralBackgroundProperties
            'backColor',
            'backImage',
            'shadow',
            // IGeneralBorderProperties
            'withBorder',
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
            'fontSize',
            'fontBold',
            'fontAccent',
            'textEffect',
            'textAlign',
            'textColorHarmonious',
            'textColor',
            'textLineSpacing',
            // IGeneralIconProperties
            'icon',
            'iconSize',
            'iconStyle',
            'iconColor',
            'iconPlacement',
            'imageDatabase'
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
    // #region TransitionColors
    /**
     * Получить свойства CSS по переходу цвета и тени в виде TCssProperties
     * @returns Свойства CSS по переходу цвета и тени в виде TCssProperties
     */
    static getTransitionColorsProps() {
        return {
            transition: `background-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${Theme.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
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