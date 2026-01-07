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
import { TCssAlignItems, TCssGap, TCssJustifyContent, TSizeType } from '#types';

export interface IVerticalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'>
{
  spacing?: TCssGap | TSizeType;
  hAlign?: TCssAlignItems;
  vAlign?: TCssJustifyContent;
  wrap?: boolean;
}

export function VerticalStack(props: IVerticalStackProps)
{
  const { spacing, vAlign, hAlign, wrap = false, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: hAlign,
    justifyContent: vAlign ?? 'flex-start',
    rowGap: GapSizes.getFromCssVariable(spacing),
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BackgroundPropertiesHelper.createBackgroundProps(props),
    ...BackgroundPropertiesHelper.createBoxShadowProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props)
  };

  const stackClass = css({ ...styleDiv, label: 'VerticalStack' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={stackClass} {...domProps}>
      {children}
    </div>
  );
}
