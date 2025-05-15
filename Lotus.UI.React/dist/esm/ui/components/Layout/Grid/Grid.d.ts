import React, { ComponentPropsWithRef, CSSProperties } from 'react';
export interface IGridProps extends ComponentPropsWithRef<'div'> {
    gridTemplateColumns: CSSProperties['gridTemplateColumns'];
    gridTemplateRows: CSSProperties['gridTemplateRows'];
    columnGap?: CSSProperties['columnGap'];
    rowGap?: CSSProperties['rowGap'];
    horizontalAlign?: CSSProperties['justifyContent'];
    verticalAlign?: CSSProperties['alignContent'];
    horizontalContentAlign?: CSSProperties['justifyItems'];
    verticalContentAlign?: CSSProperties['alignItems'];
}
export declare const Grid: React.FC<IGridProps>;
