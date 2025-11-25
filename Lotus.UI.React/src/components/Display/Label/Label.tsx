/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import { CSSProperties } from 'react';
import { IGeneralIconProperties } from '#base';
import { CssBorderHelper, CssContainerHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { RenderIcon } from '#render';
import { TCssGap, TElementSpacing, TIconPlacement } from '#types';
import { ITextProps } from '../Text';

export interface ILabelProps extends ITextProps, IGeneralIconProperties
{

}

const getFlexContainer = (iconPlacement?: TIconPlacement, gap?: TElementSpacing | TCssGap): CSSProperties | undefined =>
{
  switch (iconPlacement)
  {
    case 'left': return CssContainerHelper.getFlexRowContainer(gap ?? 'md');
    case 'right': return CssContainerHelper.getFlexRowContainer(gap ?? 'md', true);
    case 'top': return CssContainerHelper.getFlexColumnContainer(gap ?? 'md');
    case 'bottom': return CssContainerHelper.getFlexColumnContainer(gap ?? 'md', true);
  }

  return undefined;
};

export function Label(props: ILabelProps)
{
  const isIcon = Assert.existValue(props.icon);
  const styleSpan: CSSProperties = {
    lineHeight: 'normal',
    display: isIcon ? 'flex' : 'inline-block',
    ...CssSpacingHelper.getPaddingProps(props),
    ...CssSpacingHelper.getMarginProps(props),
    ...CssContainerHelper.getContainerProps(props),
    ...CssBorderHelper.getBorderProps(props),
    ...CssBorderHelper.getBorderShadowProps(props),
    ...CssFontHelper.getFontProps(props),
    ...CssFontHelper.getTextEffectProps(props),
    ...(isIcon ? getFlexContainer(props.iconPlacement, 'xxs') : undefined)
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
