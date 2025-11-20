import { IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { TCssGap, TCssMargin, TCssPadding, TCssProperties, TElementSpacing } from '#types';
export declare abstract class CssSpacingHelper {
    /**
     * Заполнить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства внутренних отступов элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static fillPaddingProps(style: TCssProperties, props: IGeneralPaddingProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по внутреннему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
     */
    static getPaddingProps(props: IGeneralPaddingProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по внутреннему отступу в виде TCssPadding
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по внутреннему отступу в виде TCssPadding
     */
    static getPaddingPropsValue(value?: TCssPadding | TElementSpacing): TCssPadding | undefined;
    /**
     * Заполнить свойства CSS по внешнему отступу в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства внешних отступов элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static fillMarginProps(style: TCssProperties, props: IGeneralMarginProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по внешнему отступу в виде TCssProperties
     * @param props Общие свойства внутренних отступов элемента UI
     * @returns Свойства CSS по внешнему отступу в виде TCssProperties
     */
    static getMarginProps(props: IGeneralMarginProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по внешнему отступу в виде TCssMargin
     * @param value Значение свойства CSS
     * @param negative Отрицательное значение свойства
     * @returns Значение свойства CSS по внешнему отступу в виде TCssMargin
     */
    static getMarginPropsValue(value?: TCssMargin | TElementSpacing, negative?: boolean): TCssMargin | undefined;
    /**
     * Получить значение свойства CSS по отступу в виде TCssGap
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по отступу в виде TCssGap
     */
    static getGapPropsValue(value?: TCssGap | TElementSpacing): TCssGap | undefined;
}
//# sourceMappingURL=CssSpacingHelper.d.ts.map