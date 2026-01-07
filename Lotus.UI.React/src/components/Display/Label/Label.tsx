/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { CSSProperties } from 'react';
import {
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralIconProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper,
  TextPropertiesHelper
} from '#base';
import { CssPropertiesHelper } from '#helpers';
import { RenderIcon } from '#render';
import { TCssGap, TIconPlacement, TSizeType } from '#types';
import { ITextProps } from '../Text';

export interface ILabelProps extends ITextProps, IGeneralIconProperties {}

const getFlexContainer = (iconPlacement?: TIconPlacement, gap?: TCssGap | TSizeType): CSSProperties | undefined => 
{
  switch (iconPlacement) 
  {
    case 'left':
      return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md');
    case 'right':
      return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md', true);
    case 'top':
      return ContainerPropertiesHelper.getFlexColumnContainer(gap ?? 'md');
    case 'bottom':
      return ContainerPropertiesHelper.getFlexColumnContainer(gap ?? 'md', true);
  }

  return ContainerPropertiesHelper.getFlexRowContainer(gap ?? 'md');
};

export function Label(props: ILabelProps) 
{
  const { isBlock = false, asBadge } = props;

  const isIcon = Assert.existValue(props.icon);
  const isBadge = Assert.existValue(asBadge);

  const styleSpan: CSSProperties = {
    lineHeight: 'normal',
    display: isBlock ? (isIcon ? 'flex' : 'block') : isIcon ? 'flex' : 'inline-block',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props),
    ...TextPropertiesHelper.createTextProps(props),
    ...(isIcon ? getFlexContainer(props.iconPlacement, 'md') : undefined),
    backgroundColor: isBadge ? ColorCssHelper.getColorCssWithAlpha(asBadge, 0.2) : undefined,
    borderColor: isBadge
      ? Assert.existValue(props.bdColor)
        ? BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor)
        : ColorCssHelper.getColorCssWithAlpha(asBadge, 0.5)
      : BorderPropertiesHelper.getBorderColorPropsValue(props.bdColor)
  };

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(props);

  if (isIcon) 
  {
    const textClass = css({ ...styleSpan, label: 'LabelContainer' });

    return (
      <div className={textClass} {...domProps}>
        {RenderIcon.renderIcon(props.iconSize ?? 'md', props.icon, undefined, props.iconStyle, props.iconColor, props.imageDatabase)}
        {props.children}
      </div>
    );
  }
  else 
  {
    const textClass = css({ ...styleSpan, label: 'Label' });
    return (
      <div className={textClass} {...domProps}>
        {props.children}
      </div>
    );
  }
}
