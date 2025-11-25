import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TElementSpacing } from '#types';

export interface IHorizontalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'>
{
  spacing?: TCssGap | TElementSpacing;
  hAlign?: TCssJustifyContent;
  vAlign?: TCssAlignItems;
  wrap?: boolean;
}

export function HorizontalStack(props: IHorizontalStackProps)
{
  const { spacing, vAlign, hAlign, wrap, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: vAlign,
    justifyContent: hAlign ?? 'flex-start',
    columnGap: CssSpacingHelper.getGapPropsValue(spacing),
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...BuilderCssProperties.buildContainer(props),
    ...BuilderCssProperties.buildBackground(props)
  };

  const stackClass = css({ ...styleDiv, label: 'HorizontalStack' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return <div className={stackClass} {...domProps}>{children}</div>;
}
