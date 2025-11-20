import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { BuilderCssProperties } from '#builder';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TElementSpacing } from '#types';
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';

export interface IVerticalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'>
{
  spacing?: TCssGap | TElementSpacing;
  hAlign?: TCssAlignItems;
  vAlign?: TCssJustifyContent;
  wrap?: boolean;
}

export function VerticalStack(props: IVerticalStackProps)
{
  const { spacing, vAlign, hAlign, wrap, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: hAlign,
    justifyContent: vAlign ?? 'flex-start',
    rowGap: CssSpacingHelper.getGapPropsValue(spacing),
    flexWrap: Boolean(wrap) ? 'wrap' : 'nowrap',
    ...BuilderCssProperties.buildContainer(props),
    ...BuilderCssProperties.buildBackground(props),
  };

  const stackClass = css({ ...styleDiv, label: 'HorizontalStack' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return <div className={stackClass} {...domProps}>{children}</div>;
}