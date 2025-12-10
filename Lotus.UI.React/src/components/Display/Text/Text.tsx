/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import { IGeneralContainerProperties, IGeneralTextProperties } from '#base';
import { CssBorderHelper, CssContainerHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';

export interface ITextProps extends IGeneralContainerProperties, IGeneralTextProperties, ComponentPropsWithRef<'div'>
{
  isBlock?: boolean;
}

export function Text(props: ITextProps)
{
  const { isBlock = false } = props;

  const styleSpan: CSSProperties = {
    lineHeight: 'normal',
    display: isBlock ? 'block' : 'inline-block',
    ...CssSpacingHelper.getPaddingProps(props),
    ...CssSpacingHelper.getMarginProps(props),
    ...CssContainerHelper.getContainerProps(props),
    ...CssBorderHelper.getBorderProps(props),
    ...CssBorderHelper.getBorderShadowProps(props),
    ...CssFontHelper.getFontProps(props),
    ...CssFontHelper.getTextEffectProps(props)
  };

  const textClass = css({ ...styleSpan, label: 'Text' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(props);

  return (
    <div className={textClass} {...domProps}>
      {props.children}
    </div>
  );
}
