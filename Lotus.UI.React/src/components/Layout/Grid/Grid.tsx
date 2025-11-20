import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import
  {
    TCssAlignContent,
    TCssAlignItems,
    TCssGap,
    TCssGridTemplateColumns,
    TCssGridTemplateRows,
    TCssJustifyContent,
    TCssJustifyItems,
    TElementSpacing
  } from '#types';
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';

export interface IGridProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
  gridTemplateColumns?: TCssGridTemplateColumns;
  gridTemplateRows?: TCssGridTemplateRows;
  columnGap?: TCssGap | TElementSpacing;
  rowGap?: TCssGap | TElementSpacing;
  hAlign?: TCssJustifyContent;
  vAlign?: TCssAlignContent;
  hContentAlign?: TCssJustifyItems;
  vContentAlign?: TCssAlignItems;
}

export function Grid(props: IGridProps) {
  const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign, vAlign, hContentAlign, vContentAlign, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateRows: gridTemplateRows,
    columnGap: CssSpacingHelper.getGapPropsValue(columnGap),
    rowGap: CssSpacingHelper.getGapPropsValue(rowGap),
    justifyContent: hAlign ?? 'stretch',
    alignContent: vAlign ?? 'center',
    justifyItems: hContentAlign ?? 'start',
    alignItems: vContentAlign ?? 'center',
    ...BuilderCssProperties.buildContainer(props),
    ...BuilderCssProperties.buildBackground(props)
  };

  const gridClass = css({ ...styleDiv, label: 'Grid' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={gridClass} {...domProps}>
      {children}
    </div>
  );
}
