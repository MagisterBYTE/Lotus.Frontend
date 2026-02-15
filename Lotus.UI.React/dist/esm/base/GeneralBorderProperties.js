import { NumberHelper } from 'lotus-core/helpers';
import { Color, ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { RadiusSizes } from '#designSystem/sizes';
import { CssVariables } from '#designSystem/сssVariables';
import { TBorderSideFlags } from '#types';
/**
 * Вспомогательный класс для работы с общими свойствами границы элемента UI
 */
export class BorderPropertiesHelper {
    // #region Common
    /**
     * Проверка на наличие любой свойства из границ элемента UI
     * @param borderStyle Тип стиля границы
     * @param borderWidth Ширина границы
     * @param borderColor Цвет границы
     */
    static hasBorderArgs(borderStyle, borderWidth, borderColor) {
        return !!borderStyle || !!borderWidth || !!borderColor;
    }
    /**
     * Проверка на наличие любой свойства из границ элемента UI
     * @param borderProps Общие свойства для границы элемента UI
     */
    static hasBorderProps(borderProps) {
        return (!!borderProps.withBorder ||
            !!borderProps.bdStyle ||
            !!borderProps.bdWidth ||
            !!borderProps.bdColor ||
            !!borderProps.bdRadius ||
            !!borderProps.bdRadiusBottomLeft ||
            !!borderProps.bdRadiusBottomRight ||
            !!borderProps.bdRadiusTopLeft ||
            !!borderProps.bdRadiusTopRight);
    }
    /**
     * Проверка на наличие полных свойства радиуса из границ элемента UI
     * @param borderProps Общие свойства для границы элемента UI
     */
    static hasNonShorthandBorderRadiusProps(borderProps) {
        return !!borderProps.bdRadiusBottomLeft || !!borderProps.bdRadiusBottomRight || !!borderProps.bdRadiusTopLeft || !!borderProps.bdRadiusTopRight;
    }
    // #endregion
    // #region Border
    /**
     * Создать свойства CSS по границе в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static createBorderProps(props) {
        const borderProps = {};
        if (BorderPropertiesHelper.hasBorderProps(props)) {
            const color = BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor) ?? CssVariables.BorderColor;
            const style = props.bdStyle ?? 'solid';
            const width = BorderPropertiesHelper.getBorderWidthPropsValue(props.bdWidth) ?? CssVariables.BorderWidth;
            if (Assert.emptyValue(props.withBorder) || typeof props.withBorder === 'boolean') {
                borderProps.borderColor = color;
                borderProps.borderStyle = style;
                borderProps.borderWidth = width;
            }
            else {
                if (typeof props.withBorder === 'number') {
                    const isLeft = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Left);
                    if (isLeft) {
                        borderProps.borderLeftColor = color;
                        borderProps.borderLeftStyle = style;
                        borderProps.borderLeftWidth = width;
                    }
                    const isRight = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Right);
                    if (isRight) {
                        borderProps.borderRightColor = color;
                        borderProps.borderRightStyle = style;
                        borderProps.borderRightWidth = width;
                    }
                    const isTop = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Top);
                    if (isTop) {
                        borderProps.borderTopColor = color;
                        borderProps.borderTopStyle = style;
                        borderProps.borderTopWidth = width;
                    }
                    const isBottom = NumberHelper.isFlagSet(props.withBorder, TBorderSideFlags.Bottom);
                    if (isBottom) {
                        borderProps.borderBottomColor = color;
                        borderProps.borderBottomStyle = style;
                        borderProps.borderBottomWidth = width;
                    }
                }
            }
            if (BorderPropertiesHelper.hasNonShorthandBorderRadiusProps(props)) {
                borderProps.borderTopLeftRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusTopLeft);
                borderProps.borderTopRightRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusTopRight);
                borderProps.borderBottomLeftRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusBottomLeft);
                borderProps.borderBottomRightRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadiusBottomRight);
            }
            else {
                borderProps.borderRadius = BorderPropertiesHelper.getBorderRadiusPropsValue(props.bdRadius);
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
            return undefined;
        return ColorCssHelper.getColor(value);
    }
    /**
     * Получить значение свойства CSS по радиусу в виде TCssBorderRadius
     * @param designSystem Дизайн-система
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по радиусу в виде TCssBorderRadius
     */
    static getBorderRadiusPropsValue(value) {
        if (Assert.emptyValue(value))
            return undefined;
        if (value === true)
            return CssVariables.BorderRadius;
        return RadiusSizes.getFromCssVariable(value);
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
    // #endregion
    // #region BorderShadow
    /**
     * Создать свойства CSS по границе тени в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static createBorderShadowProps(props) {
        const borderProps = {};
        const boxShadow = BorderPropertiesHelper.getBorderShadowPropsValue(props.bdShadow, props.bdColor);
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
            return `0px 0px ${elevation}px ${elevation}px ${CssVariables.BorderShadowColor}`;
        }
        else {
            const colorShadow = new Color(ColorCssHelper.getColor(color));
            return `0px 0px ${elevation}px ${elevation}px ${colorShadow.toCSSRgbValue(shadowAlpha ?? 0.5)}`;
        }
    }
}
//# sourceMappingURL=GeneralBorderProperties.js.map