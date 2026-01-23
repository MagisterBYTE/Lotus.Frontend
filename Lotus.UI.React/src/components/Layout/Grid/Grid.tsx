import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import
{
  BackgroundPropertiesHelper,
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralBackgroundProperties,
  IGeneralContainerProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper
} from '#base';
import { GapSizes } from '#designSystem/sizes';
import { CssPropertiesHelper } from '#helpers';
import
{
  TCssAlignContent,
  TCssAlignItems,
  TCssGap,
  TCssGridTemplateColumns,
  TCssGridTemplateRows,
  TCssJustifyContent,
  TCssJustifyItems,
  TSizeType
} from '#types';

export interface IGridProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'>
{
  gridTemplateColumns?: TCssGridTemplateColumns;
  gridTemplateRows?: TCssGridTemplateRows;
  columnGap?: TCssGap | TSizeType;
  rowGap?: TCssGap | TSizeType;
  hAlign?: TCssJustifyContent;
  vAlign?: TCssAlignContent;
  hContentAlign?: TCssJustifyItems;
  vContentAlign?: TCssAlignItems;
}

export function Grid(props: IGridProps) 
{
  const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, hAlign, vAlign, hContentAlign, vContentAlign, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateRows: gridTemplateRows,
    columnGap: GapSizes.getFromCssVariable(columnGap),
    rowGap: GapSizes.getFromCssVariable(rowGap),
    justifyContent: hAlign ?? 'stretch',
    alignContent: vAlign ?? 'center',
    justifyItems: hContentAlign ?? 'start',
    alignItems: vContentAlign ?? 'center',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BackgroundPropertiesHelper.createBackgroundProps(props),
    ...BackgroundPropertiesHelper.createBoxShadowProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props)
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
