import { Assert } from 'lotus-core/utils';
import { CssFontHelper, CssPropertiesHelper } from '#helpers';
import { instanceOfElementSpacing } from '#types';
export class CssSpacingHelper {
    // #region Common
    /**
     * Конвертирует значение отступа в пиксели
     * @param spacing - размер отступа в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    static getSpacingInPixels(spacing) {
        if (typeof spacing === 'number') {
            return spacing; // предполагаем, что число уже в пикселях
        }
        if (instanceOfElementSpacing(spacing)) {
            switch (spacing) {
                case 'xxs':
                    return 0.5 * 16;
                case 'xs':
                    return 0.75 * 16;
                case 'sm':
                    return 0.875 * 16;
                case 'md':
                    return 1 * 16;
                case 'lg':
                    return 1.25 * 16;
                case 'xl':
                    return 1.5 * 16;
                case 'xxl':
                    return 2 * 16;
            }
        }
        const value = parseFloat(spacing);
        const unit = spacing.replace(value.toString(), '').toLowerCase();
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
    // #region Padding
    /**
     * Заполнить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства внутренних отступов элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static fillPaddingProps(style, props, override) {
        const padding = CssSpacingHelper.getPaddingPropsValue(props.p);
        if (padding) {
            CssPropertiesHelper.overrideStyleValue(style, 'padding', padding, override);
        }
        else {
            CssPropertiesHelper.overrideStyleValue(style, 'paddingLeft', CssSpacingHelper.getPaddingPropsValue(props.pl), override);
            CssPropertiesHelper.overrideStyleValue(style, 'paddingRight', CssSpacingHelper.getPaddingPropsValue(props.pr), override);
            CssPropertiesHelper.overrideStyleValue(style, 'paddingTop', CssSpacingHelper.getPaddingPropsValue(props.pt), override);
            CssPropertiesHelper.overrideStyleValue(style, 'paddingBottom', CssSpacingHelper.getPaddingPropsValue(props.pb), override);
        }
        return style;
    }
    /**
     * Получить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static getPaddingProps(props) {
        const paddingProps = {};
        if (props.p) {
            paddingProps.padding = CssSpacingHelper.getPaddingPropsValue(props.p);
        }
        else {
            paddingProps.paddingLeft = CssSpacingHelper.getPaddingPropsValue(props.pl);
            paddingProps.paddingRight = CssSpacingHelper.getPaddingPropsValue(props.pr);
            paddingProps.paddingTop = CssSpacingHelper.getPaddingPropsValue(props.pt);
            paddingProps.paddingBottom = CssSpacingHelper.getPaddingPropsValue(props.pb);
        }
        return paddingProps;
    }
    /**
     * Получить значение свойства CSS по внутреннему отступу в виде TCssPadding
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по внутреннему отступу в виде TCssPadding
     */
    static getPaddingPropsValue(value) {
        if (Assert.emptyValue(value))
            return undefined;
        if (instanceOfElementSpacing(value)) {
            switch (value) {
                case 'xxs':
                    return '0.5rem';
                case 'xs':
                    return '0.625rem';
                case 'sm':
                    return '0.75rem';
                case 'md':
                    return '1rem';
                case 'lg':
                    return '1.25rem';
                case 'xl':
                    return '1.5rem';
                case 'xxl':
                    return '2rem';
            }
        }
        return value;
    }
    // #endregion
    // #region Margin
    /**
     * Заполнить свойства CSS по внешнему отступу в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства внешних отступов элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static fillMarginProps(style, props, override) {
        const margin = CssSpacingHelper.getMarginPropsValue(props.m);
        if (margin) {
            CssPropertiesHelper.overrideStyleValue(style, 'margin', margin, override);
        }
        else {
            CssPropertiesHelper.overrideStyleValue(style, 'marginLeft', CssSpacingHelper.getMarginPropsValue(props.ml), override);
            CssPropertiesHelper.overrideStyleValue(style, 'marginRight', CssSpacingHelper.getMarginPropsValue(props.mr), override);
            CssPropertiesHelper.overrideStyleValue(style, 'marginTop', CssSpacingHelper.getMarginPropsValue(props.mt), override);
            CssPropertiesHelper.overrideStyleValue(style, 'marginBottom', CssSpacingHelper.getMarginPropsValue(props.mb), override);
        }
        return style;
    }
    /**
     * Получить свойства CSS по внешнему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static getMarginProps(props) {
        const marginProps = {};
        if (props.m) {
            marginProps.margin = CssSpacingHelper.getMarginPropsValue(props.m);
        }
        else {
            marginProps.marginLeft = CssSpacingHelper.getMarginPropsValue(props.ml);
            marginProps.marginRight = CssSpacingHelper.getMarginPropsValue(props.mr);
            marginProps.marginTop = CssSpacingHelper.getMarginPropsValue(props.mt);
            marginProps.marginBottom = CssSpacingHelper.getMarginPropsValue(props.mb);
        }
        return marginProps;
    }
    /**
     * Получить значение свойства CSS по внешнему отступу в виде TCssMargin
     * @param value Значение свойства CSS
     * @param negative Отрицательное значение свойства
     * @returns Значение свойства CSS по внешнему отступу в виде TCssMargin
     */
    static getMarginPropsValue(value, negative) {
        if (Assert.emptyValue(value))
            return undefined;
        if (instanceOfElementSpacing(value)) {
            switch (value) {
                case 'xxs':
                    return negative ? '-0.5rem' : '0.5rem';
                case 'xs':
                    return negative ? '-0.625rem' : '0.625rem';
                case 'sm':
                    return negative ? '-0.75rem' : '0.75rem';
                case 'md':
                    return negative ? '-1rem' : '1rem';
                case 'lg':
                    return negative ? '-1.25rem' : '1.25rem';
                case 'xl':
                    return negative ? '-1.5rem' : '1.5rem';
                case 'xxl':
                    return negative ? '-2rem' : '2rem';
            }
        }
        return value;
    }
    // #endregion
    // #region Gap
    /**
     * Получить значение свойства CSS по отступу в виде TCssGap
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по отступу в виде TCssGap
     */
    static getGapPropsValue(value) {
        if (Assert.emptyValue(value))
            return undefined;
        if (instanceOfElementSpacing(value)) {
            switch (value) {
                case 'xxs':
                    return '0.5rem';
                case 'xs':
                    return '0.625rem';
                case 'sm':
                    return '0.75rem';
                case 'md':
                    return '1rem';
                case 'lg':
                    return '1.25rem';
                case 'xl':
                    return '1.5rem';
                case 'xxl':
                    return '1.5rem';
            }
        }
        return value;
    }
}
//# sourceMappingURL=CssSpacingHelper.js.map