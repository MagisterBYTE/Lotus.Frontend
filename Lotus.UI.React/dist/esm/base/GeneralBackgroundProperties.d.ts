import { TColorToken } from 'lotus-core/modules/color';
import { TCssBackgroundColor, TCssBackgroundImage, TCssBoxShadow, TCssProperties, TShadowElevation } from '#types';
/**
 * Общие свойства для фона элемента UI
 */
export interface IGeneralBackgroundProperties {
    /**
     * Основной цвет
     */
    bgColor?: TCssBackgroundColor | TColorToken;
    /**
     * Фоновое изображение
     */
    bgImage?: TCssBackgroundImage;
    /**
     * Размер тени
     */
    bgShadow?: TShadowElevation;
}
/**
 * Вспомогательный класс для работы с общими свойства фона элемента UI
 */
export declare abstract class BackgroundPropertiesHelper {
    /**
     * Создать свойства CSS по свойствам фона в виде TCssProperties
     * @param props Общие свойства для фона элемента UI
     * @returns Свойства CSS по свойствам фона в виде TCssProperties
     */
    static createBackgroundProps(props: IGeneralBackgroundProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по цвету фона в виде TCssBackgroundColor
     * @param value Значение свойства CSS
     * @returns Значение свойства CSS по цвету фона в виде TCssBackgroundColor
     */
    static getBackgroundColorPropsValue(value?: TCssBackgroundColor | TColorToken): TCssBackgroundColor | undefined;
    /**
     * Создать свойства CSS по тени в виде TCssProperties
     * @param props Общие свойства для фона элемента UI
     * @returns Свойства CSS по тени в виде TCssProperties
     */
    static createBoxShadowProps(props: IGeneralBackgroundProperties): TCssProperties;
    /**
     * Получить значение свойства CSS по тени в виде TCssBoxShadow
     * @param elevation Относительный размер тени
     * @param color Цвет тени
     * @returns Свойства CSS по тени в виде TCssBoxShadow
     */
    static getBoxShadowPropsValue(elevation?: TShadowElevation, color?: string): TCssBoxShadow | undefined;
}
//# sourceMappingURL=GeneralBackgroundProperties.d.ts.map