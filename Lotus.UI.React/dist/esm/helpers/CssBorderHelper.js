import { Assert } from 'lotus-core/utils';
import { hasBorderProps, hasNonShorthandBorderRadiusProps } from '#base';
import { CssFontHelper, CssPropertiesHelper } from '#helpers';
import { ThemeInstance } from '#theme';
import { instanceOfElementRadius } from '#types';
export class CssBorderHelper {
    // #region Border
    /**
     * Заполнить свойства CSS по границе в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для границы элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static fillBorderProps(style, props, override) {
        if (hasBorderProps(props) === false)
            return style;
        // borderColor
        const borderColor = CssBorderHelper.getBorderColorPropsValue(props.borderColor);
        CssPropertiesHelper.overrideStyleValue(style, 'borderColor', borderColor, override);
        // borderStyle
        CssPropertiesHelper.overrideStyleValue(style, 'borderStyle', props.borderStyle ?? 'solid', override);
        // borderWidth
        CssPropertiesHelper.overrideStyleValue(style, 'borderWidth', CssBorderHelper.getBorderWidthPropsValue(props.borderWidth) ?? '1px', override);
        if (hasNonShorthandBorderRadiusProps(props)) {
            CssPropertiesHelper.overrideStyleValue(style, 'borderTopLeftRadius', CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusTopLeft), override);
            CssPropertiesHelper.overrideStyleValue(style, 'borderTopRightRadius', CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusTopRight), override);
            CssPropertiesHelper.overrideStyleValue(style, 'borderBottomLeftRadius', CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusBottomLeft), override);
            CssPropertiesHelper.overrideStyleValue(style, 'borderBottomRightRadius', CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusBottomRight), override);
        }
        else {
            CssPropertiesHelper.overrideStyleValue(style, 'borderRadius', CssBorderHelper.getBorderRadiusPropsValue(props.borderRadius), override);
        }
        return style;
    }
    /**
     * Получить свойства CSS по границе в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static getBorderProps(props) {
        const borderProps = {};
        if (hasBorderProps(props)) {
            borderProps.borderColor = CssBorderHelper.getBorderColorPropsValue(props.borderColor);
            borderProps.borderStyle = props.borderStyle ?? 'solid';
            borderProps.borderWidth = CssBorderHelper.getBorderWidthPropsValue(props.borderWidth) ?? '1px';
            if (hasNonShorthandBorderRadiusProps(props)) {
                borderProps.borderTopLeftRadius = CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusTopLeft);
                borderProps.borderTopRightRadius = CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusTopRight);
                borderProps.borderBottomLeftRadius = CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusBottomLeft);
                borderProps.borderBottomRightRadius = CssBorderHelper.getBorderRadiusPropsValue(props.borderRadiusBottomRight);
            }
            else {
                borderProps.borderRadius = CssBorderHelper.getBorderRadiusPropsValue(props.borderRadius);
            }
        }
        return borderProps;
    }
    /**
     * Получить значение свойства CSS по цвету в виде TCssBorderRadius
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по цвету в виде TCssBorderRadius
     */
    static getBorderColorPropsValue(value) {
        if (Assert.emptyValue(value))
            return 'var(--mantine-color-default-border)';
        const colorBorder = ThemeInstance.getElementColor(value);
        return colorBorder.toCSSRgbValue();
    }
    /**
     * Получить значение свойства CSS по радиусу в виде TCssBorderRadius
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по радиусу в виде TCssBorderRadius
     */
    static getBorderRadiusPropsValue(value) {
        if (Assert.emptyValue(value))
            return undefined;
        if (value === true)
            return '0.25rem';
        if (instanceOfElementRadius(value)) {
            switch (value) {
                case 'xs':
                    return '0.625rem';
                case 'sm':
                    return '0.75rem';
                case 'md':
                    return '1rem';
                case 'lg':
                    return '1.25rem';
                case 'xl':
                    return '2rem';
            }
        }
        return value;
    }
    /**
     * Получить значение свойства CSS по ширине границы в виде TCssBorderWidth
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по ширине границы в виде TCssBorderWidth
     */
    static getBorderWidthPropsValue(value) {
        if (Assert.emptyValue(value))
            return undefined;
        if (typeof value === 'number')
            return `${value}px`;
        return value;
    }
    /**
     * Конвертирует значение ширины границы в пиксели
     * @param margin - значение ширины границы в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    static getBorderWidthPixels(width) {
        if (typeof width === 'number') {
            return width; // предполагаем, что число уже в пикселях
        }
        const value = parseFloat(width);
        const unit = width.replace(value.toString(), '').toLowerCase();
        switch (unit) {
            case 'px':
                return value;
            case 'rem':
                return value * CssFontHelper.getRootFontSize();
            case 'em':
                // Для em нужно знать контекст, возвращаем приблизительное значение
                return value * 16; // предполагаем базовый размер 16px
            case 'pt':
                return value * 1.333; // 1pt = 1.333px
            case 'mm':
                return value * 3.7795; // 1mm = 3.7795px
            case 'cm':
                return value * 37.795; // 1cm = 37.795px
            case 'in':
                return value * 96; // 1inch = 96px
            case '%':
                return (value * 16) / 100; // предполагаем базовый размер 16px
            default:
                // Если единица не распознана, возвращаем как есть (предполагаем px)
                return value;
        }
    }
    // #endregion
    // #region BorderShadow
    /**
     * Заполнить свойства CSS по границе тени в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для границы элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static fillBorderShadowProps(style, props, override) {
        const boxShadow = CssBorderHelper.getBorderShadowPropsValue(props.borderShadow, props.borderColor);
        CssPropertiesHelper.overrideStyleValue(style, 'boxShadow', boxShadow, override);
        return style;
    }
    /**
     * Получить свойства CSS по границе тени в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static getBorderShadowProps(props) {
        const borderProps = {};
        const boxShadow = CssBorderHelper.getBorderShadowPropsValue(props.borderShadow, props.borderColor);
        if (Assert.existValue(boxShadow)) {
            borderProps.boxShadow = boxShadow;
        }
        return borderProps;
    }
    /**
     * Получить значение свойства CSS по тени границы в виде TCssBoxShadow
     * @param elevation Относительный размер тени
     * @param color Вариант цвета темы
     * @param shadowAlpha Альфа компонент цвета для тени
     * @returns Свойства CSS по тени границы в виде TCssBoxShadow
     */
    static getBorderShadowPropsValue(elevation, color, shadowAlpha) {
        if (Assert.emptyValue(elevation))
            return undefined;
        if (Assert.emptyValue(color)) {
            return `0px 0px ${elevation}px ${elevation}px var(--mantine-primary-color-light)`;
        }
        else {
            const colorShadow = ThemeInstance.getElementColor(color);
            return `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha ?? 0.5)}`;
        }
    }
}
//# sourceMappingURL=CssBorderHelper.js.map