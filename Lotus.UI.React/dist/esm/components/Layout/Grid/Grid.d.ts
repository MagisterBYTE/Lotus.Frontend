import { ComponentPropsWithRef } from 'react';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { TCssAlignContent, TCssAlignItems, TCssGap, TCssGridTemplateColumns, TCssGridTemplateRows, TCssJustifyContent, TCssJustifyItems, TSizeType } from '#types';
export interface IGridProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
    gridTemplateColumns?: TCssGridTemplateColumns;
    gridTemplateRows?: TCssGridTemplateRows;
    columnGap?: TCssGap | TSizeType;
    rowGap?: TCssGap | TSizeType;
    hAlign?: TCssJustifyContent;
    vAlign?: TCssAlignContent;
    hContentAlign?: TCssJustifyItems;
    vContentAlign?: TCssAlignItems;
}
export declare function Grid(props: IGridProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Grid.d.ts.map