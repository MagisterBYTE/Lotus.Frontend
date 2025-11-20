import { IGeneralContainerProperties } from '#base';
import { TCssProperties } from '#types';
export declare abstract class CssContainerHelper {
    /**
     * Заполнить свойства CSS по контейнеру в виде TCssProperties
     * @param style Текущие свойства
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @param override Перезаписать если эти свойства уже есть
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static fillContainerProps(style: TCssProperties, props: IGeneralContainerProperties, override: boolean): TCssProperties;
    /**
     * Получить свойства CSS по контейнеру в виде TCssProperties
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static getContainerProps(props: IGeneralContainerProperties): TCssProperties;
}
//# sourceMappingURL=CssContainerHelper.d.ts.map