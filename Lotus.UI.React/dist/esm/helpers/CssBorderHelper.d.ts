import { IGeneralBorderProperties } from '#base';
import { TThemeColor } from '#theme/types';
import { TCssProperties, TCssBorderRadius, TCssBorderWidth, TElementRadius, TShadowElevation, TCssBoxShadow, TCssBorderColor } from '#types';
export declare abstract class CssBorderHelper {
    /**
     * Заполнить свойства CSS по границе в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для границы элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static fillBorderProps(style: TCssProperties, props: IGeneralBorderProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по границе в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static getBorderProps(props: IGeneralBorderProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по цвету в виде TCssBorderRadius
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по цвету в виде TCssBorderRadius
     */
    static getBorderColorPropsValue(value?: TThemeColor): TCssBorderColor;
    /**
     * Получить значение свойства CSS по радиусу в виде TCssBorderRadius
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по радиусу в виде TCssBorderRadius
     */
    static getBorderRadiusPropsValue(value?: TCssBorderRadius | TElementRadius | true): TCssBorderRadius | undefined;
    /**
     * Получить значение свойства CSS по ширине границы в виде TCssBorderWidth
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по ширине границы в виде TCssBorderWidth
     */
    static getBorderWidthPropsValue(value?: TCssBorderWidth | number): TCssBorderWidth | undefined;
    /**
     * Конвертирует значение ширины границы в пиксели
     * @param margin - значение ширины границы в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    static getBorderWidthPixels(width: TCssBorderWidth | number): number;
    /**
     * Заполнить свойства CSS по границе тени в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для границы элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static fillBorderShadowProps(style: TCssProperties, props: IGeneralBorderProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по границе тени в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static getBorderShadowProps(props: IGeneralBorderProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по тени границы в виде TCssBoxShadow
     * @param elevation Относительный размер тени
     * @param color Вариант цвета темы
     * @param shadowAlpha Альфа компонент цвета для тени
     * @returns Свойства CSS по тени границы в виде TCssBoxShadow
     */
    static getBorderShadowPropsValue(elevation?: TShadowElevation, color?: TThemeColor, shadowAlpha?: number): TCssBoxShadow | undefined;
}
//# sourceMappingURL=CssBorderHelper.d.ts.map