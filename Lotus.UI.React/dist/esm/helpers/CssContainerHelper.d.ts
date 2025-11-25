import { CSSProperties } from 'react';
import { IGeneralContainerProperties } from '#base';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TCssProperties, TElementSpacing } from '#types';
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
    /**
     * Получить оптимальные настройки Flex контейнера по горизонтали в виде CSSProperties
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param horizontalAlign Распределение элементов по ширине
     * @param verticalAlign Выравнивание элементов по вертикали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexRowContainer(padding: TElementSpacing | TCssGap, isReverse?: boolean, horizontalAlign?: TCssJustifyContent, verticalAlign?: TCssAlignItems): CSSProperties;
    /**
     * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param verticalAlign Распределение элементов по высоте
     * @param horizontalAlign Выравнивание элементов по горизонтали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexColumnContainer(padding: TElementSpacing | TCssGap, isReverse?: boolean, verticalAlign?: TCssJustifyContent, horizontalAlign?: TCssAlignItems): CSSProperties;
}
//# sourceMappingURL=CssContainerHelper.d.ts.map