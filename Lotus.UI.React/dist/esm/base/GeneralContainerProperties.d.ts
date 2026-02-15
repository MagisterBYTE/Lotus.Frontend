import { CSSProperties } from 'react';
import { IGeneralBorderProperties, IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { TCssAlignItems, TCssFlexGrow, TCssFlexShrink, TCssGap, TCssHeight, TCssJustifyContent, TCssProperties, TCssWidth, TSizeType } from '#types';
/**
 * Общие свойства элемента UI выступающего в качестве базового контейнера
 */
export interface IGeneralContainerProperties extends IGeneralMarginProperties, IGeneralPaddingProperties, IGeneralBorderProperties {
    /**
     * Ширина
     */
    w?: TCssWidth;
    /**
     * Высота
     */
    h?: TCssHeight;
    /**
     * Коэффициент растяжения при flex
     */
    grow?: TCssFlexGrow;
    /**
     * Коэффициент сжатия при flex
     */
    shrink?: TCssFlexShrink;
    /**
     * Индекс колонки при grid
     */
    gridColumn?: number;
    /**
     * Количество колонок при grid
     */
    gridColumnSpan?: number;
    /**
     * Индекс строки при grid
     */
    gridRow?: number;
    /**
     * Количество строк при grid
     */
    gridRowSpan?: number;
}
/**
 * Вспомогательный класс для работы с общими свойства элемента UI выступающего в качестве базового контейнера
 */
export declare abstract class ContainerPropertiesHelper {
    /**
     * Получить стандартные свойства контейнера
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Стандартные свойства контейнера
     */
    static getContainerProperties(props: IGeneralContainerProperties): {
        w: TCssWidth | undefined;
        h: TCssHeight | undefined;
        p: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        pl: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        pt: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        pr: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        pb: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        m: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        ml: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        mt: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        mr: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
        mb: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | import("#types").TCssPadding | undefined;
    };
    /**
     * Создать свойства CSS по контейнеру в виде TCssProperties
     * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
     * @returns Свойства CSS по контейнеру в виде TCssProperties
     */
    static createContainerProps(props: IGeneralContainerProperties): TCssProperties;
    /**
     * Получить оптимальные настройки Flex контейнера по горизонтали в виде CSSProperties
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param horizontalAlign Распределение элементов по ширине
     * @param verticalAlign Выравнивание элементов по вертикали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexRowContainer(padding: TSizeType | TCssGap, isReverse?: boolean, horizontalAlign?: TCssJustifyContent, verticalAlign?: TCssAlignItems): CSSProperties;
    /**
     * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
     * @param designSystem Дизайн-система
     * @param padding Внутренний отступ
     * @param isReverse Обратный порядок элементов
     * @param verticalAlign Распределение элементов по высоте
     * @param horizontalAlign Выравнивание элементов по горизонтали
     * @returns Настройки Flex контейнера в виде CSSProperties
     */
    static getFlexColumnContainer(padding: TSizeType | TCssGap, isReverse?: boolean, verticalAlign?: TCssJustifyContent, horizontalAlign?: TCssAlignItems): CSSProperties;
}
//# sourceMappingURL=GeneralContainerProperties.d.ts.map