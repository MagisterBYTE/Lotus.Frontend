/* eslint-disable react/destructuring-assignment */
import { css } from '@emotion/css';
import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import {
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralContainerProperties,
  IGeneralTextProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper,
  TextPropertiesHelper
} from '#base';
import { CssPropertiesHelper } from '#helpers';
import { TCssBackgroundColor } from '#types';

export interface ITextProps extends IGeneralContainerProperties, IGeneralTextProperties, ComponentPropsWithRef<'div'> {
  /**
   * Блоковый или строчный элемент
   */
  isBlock?: boolean;

  /**
   * Если указан цвет, показывать как badge
   */
  asBadge?: TCssBackgroundColor | TColorToken;
}

export function Text(props: ITextProps) 
{
  const { isBlock = false, asBadge } = props;

  const isBadge = Assert.existValue(asBadge);

  const styleSpan: CSSProperties = {
    lineHeight: 'normal',
    display: isBlock ? 'block' : 'inline-block',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BorderPropertiesHelper.createBorderProps(props),
    ...BorderPropertiesHelper.createBorderShadowProps(props),
    ...TextPropertiesHelper.createTextProps(props),
    backgroundColor: isBadge ? ColorCssHelper.getColorCssWithAlpha(asBadge, 0.2) : undefined
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
