import { IGeneralBorderProperties, IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { TCssFlexGrow, TCssFlexShrink, TCssGridColumn, TCssGridRow, TCssHeight, TCssWidth } from '#types';
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
    gridColumn?: TCssGridColumn;
    /**
     * Количество колонок при grid
     */
    gridColumnSpan?: TCssGridColumn;
    /**
     * Индекс строки при grid
     */
    gridRow?: TCssGridRow;
    /**
     * Количество строк при grid
     */
    gridRowSpan?: TCssGridColumn;
}
export declare function getContainerProperties(props: IGeneralContainerProperties): {
    w: TCssWidth | undefined;
    h: TCssHeight | undefined;
    p: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    pl: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    pt: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    pr: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    pb: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    m: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    ml: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    mt: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    mr: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
    mb: import("#types").TCssPadding | import("#types").TElementSpacing | undefined;
};
//# sourceMappingURL=GeneralContainerProperties.d.ts.map