import { IGeneralBackgroundProperties } from '#base';
import { TThemeColor } from '#theme/types';
import { TCssBackgroundColor, TCssBoxShadow, TCssProperties, TShadowElevation } from '#types';
export declare abstract class CssBackgroundHelper {
    /**
     * Заполнить свойства CSS по свойствам фона в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для фона элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по свойствам фона в виде TCssProperties
     */
    static fillBackgroundProps(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по свойствам фона в виде TCssProperties
     * @param props Общие свойства для фона элемента UI
     * @returns Свойства CSS по свойствам фона в виде TCssProperties
     */
    static getBackgroundProps(props: IGeneralBackgroundProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по цвету фона в виде TCssBackgroundColor
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по цвету фона в виде TCssBackgroundColor
     */
    static getBackgroundColorPropsValue(value?: TThemeColor): TCssBackgroundColor | undefined;
    /**
     * Заполнить свойства CSS по тени в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства для фона элемента UI
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по тени в виде TCssProperties
     */
    static fillBoxShadowProps(style: TCssProperties, props: IGeneralBackgroundProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по тени в виде TCssProperties
     * @param props Общие свойства для фона элемента UI
     * @returns Свойства CSS по тени в виде TCssProperties
     */
    static getBoxShadowProps(props: IGeneralBackgroundProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по тени в виде TCssBoxShadow
     * @param elevation Относительный размер тени
     * @param color Вариант цвета темы
     * @returns Свойства CSS по тени в виде TCssBoxShadow
     */
    static getBoxShadowPropsValue(elevation?: TShadowElevation, color?: TThemeColor): TCssBoxShadow | undefined;
}
//# sourceMappingURL=CssBackgroundHelper.d.ts.map