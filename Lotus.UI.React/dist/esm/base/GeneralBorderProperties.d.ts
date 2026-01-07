import { TColorToken } from 'lotus-core/modules/color';
import { TCssBorderColor, TCssBorderRadius, TCssBorderStyle, TCssBorderWidth, TCssBoxShadow, TCssProperties, TShadowElevation, TSizeType } from '#types';
/**
 * Тип стороны границы
 */
export declare const TBorderSideSet: {
    /**
     * Левая граница
     */
    readonly Left: 1;
    /**
     * Правая граница
     */
    readonly Right: 2;
    /**
     * Верхняя граница
     */
    readonly Top: 4;
    /**
     * Нижняя граница
     */
    readonly Bottom: 8;
};
/**
 * Общие свойства для границы элемента UI
 */
export interface IGeneralBorderProperties {
    /**
     * Статус наличия границы
     */
    withBorder?: boolean | number;
    /**
     * Тип стиля границы
     */
    bdStyle?: TCssBorderStyle;
    /**
     * Ширина границы
     */
    bdWidth?: TCssBorderWidth | number;
    /**
     * Цвет границы
     */
    bdColor?: TCssBorderColor | TColorToken;
    /**
     * Скругление границы
     */
    bdRadius?: TCssBorderRadius | TSizeType | true;
    /**
     * Скругление границы верхнего левого края
     */
    bdRadiusTopLeft?: TCssBorderRadius | TSizeType | true;
    /**
     * Скругление границы нижнего левого края
     */
    bdRadiusBottomLeft?: TCssBorderRadius | TSizeType | true;
    /**
     * Скругление границы верхнего правого края
     */
    bdRadiusTopRight?: TCssBorderRadius | TSizeType | true;
    /**
     * Скругление границы нижнего правого края
     */
    bdRadiusBottomRight?: TCssBorderRadius | TSizeType | true;
    /**
     * Размер тени границы
     */
    bdShadow?: TShadowElevation;
}
/**
 * Вспомогательный класс для работы с общими свойствами границы элемента UI
 */
export declare abstract class BorderPropertiesHelper {
    /**
     * Проверка на наличие любой свойства из границ элемента UI
     * @param borderStyle Тип стиля границы
     * @param borderWidth Ширина границы
     * @param borderColor Цвет границы
     */
    static hasBorderArgs(borderStyle?: TCssBorderStyle, borderWidth?: TCssBorderWidth, borderColor?: string): boolean;
    /**
     * Проверка на наличие любой свойства из границ элемента UI
     * @param borderProps Общие свойства для границы элемента UI
     */
    static hasBorderProps(borderProps: IGeneralBorderProperties): boolean;
    /**
     * Проверка на наличие полных свойства радиуса из границ элемента UI
     * @param borderProps Общие свойства для границы элемента UI
     */
    static hasNonShorthandBorderRadiusProps(borderProps: IGeneralBorderProperties): boolean;
    /**
     * Создать свойства CSS по границе в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе в виде TCssProperties
     */
    static createBorderProps(props: IGeneralBorderProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по цвету в виде TCssBorderRadius
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по цвету в виде TCssBorderRadius
     */
    static getBorderColorPropsValue(value?: string): TCssBorderColor | undefined;
    /**
     * Получить значение свойства CSS по радиусу в виде TCssBorderRadius
     * @param designSystem Дизайн-система
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по радиусу в виде TCssBorderRadius
     */
    static getBorderRadiusPropsValue(value?: TCssBorderRadius | TSizeType | true): TCssBorderRadius | undefined;
    /**
     * Получить значение свойства CSS по ширине границы в виде TCssBorderWidth
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по ширине границы в виде TCssBorderWidth
     */
    static getBorderWidthPropsValue(value?: TCssBorderWidth | number): TCssBorderWidth | undefined;
    /**
     * Создать свойства CSS по границе тени в виде TCssProperties
     * @param props Общие свойства для границы элемента UI
     * @returns Свойства CSS по границе тени в виде TCssProperties
     */
    static createBorderShadowProps(props: IGeneralBorderProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по тени границы в виде TCssBoxShadow
     * @param elevation Относительный размер тени
     * @param color Вариант цвета темы
     * @param shadowAlpha Альфа компонент цвета для тени
     * @returns Свойства CSS по тени границы в виде TCssBoxShadow
     */
    static getBorderShadowPropsValue(elevation?: TShadowElevation, color?: string, shadowAlpha?: number): TCssBoxShadow | undefined;
}
//# sourceMappingURL=GeneralBorderProperties.d.ts.map