import React, { ComponentPropsWithoutRef, CSSProperties, forwardRef } from 'react';

export interface IGridProps extends ComponentPropsWithoutRef<'div'>
{
  gridTemplateColumns: CSSProperties['gridTemplateColumns'];
  gridTemplateRows: CSSProperties['gridTemplateRows'];
  columnGap?: CSSProperties['columnGap'];
  rowGap?: CSSProperties['rowGap'];
  horizontalAlign?: CSSProperties['justifyContent'];
  verticalAlign?: CSSProperties['alignContent'];
  horizontalContentAlign?: CSSProperties['justifyItems'];
  verticalContentAlign?: CSSProperties['alignItems'];
}

export const Grid = forwardRef<HTMLDivElement, IGridProps>((props, ref) => 
{
  const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, horizontalAlign, verticalAlign, horizontalContentAlign,
    verticalContentAlign, children, ...divProps } = props
  return (
    <div ref={ref} {...divProps} style={{
      display: 'grid',
      gridTemplateColumns: gridTemplateColumns,
      gridTemplateRows: gridTemplateRows,
      columnGap: columnGap,
      rowGap: rowGap,
      justifyContent: horizontalAlign ?? 'stretch',
      alignContent: verticalAlign ?? 'center',
      justifyItems: horizontalContentAlign ?? 'start',
      alignItems: verticalContentAlign ?? 'center',
      ...divProps.style
    }}>
      {children}
    </div>
  );
}
)