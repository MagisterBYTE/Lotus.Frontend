import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import {
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
import { TCssAlignItems, TCssGap, TCssJustifyContent, TSizeType } from '#types';

export interface IHorizontalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
  spacing?: TCssGap | TSizeType;
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
    columnGap: GapSizes.getFromCssVariable(spacing),
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BackgroundPropertiesHelper.createBackgroundProps(props),
    ...BackgroundPropertiesHelper.createBoxShadowProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props)
  };

  const stackClass = css({ ...styleDiv, label: 'HorizontalStack' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={stackClass} {...domProps}>
      {children}
    </div>
  );
}
