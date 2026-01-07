/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { TColorToken } from 'lotus-core/modules/color';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import { BorderPropertiesHelper, IGeneralBorderProperties, IGeneralContainerProperties, MarginPropertiesHelper, PaddingPropertiesHelper } from '#base';
import { MarginSizes } from '#designSystem/sizes';
import { CssVariables } from '#designSystem/сssVariables';
import { CssPropertiesHelper } from '#helpers';
import { TCssBorderColor, TCssBorderStyle, TCssBorderWidth } from '#types';

export interface IDividerProps extends Omit<IGeneralContainerProperties, keyof IGeneralBorderProperties>, ComponentPropsWithRef<'div'>
{
  isVertical?: boolean;
  lineStyle?: TCssBorderStyle;
  lineThickness?: TCssBorderWidth;
  lineColor?: TCssBorderColor|TColorToken;
  nml?: boolean;
  nmr?: boolean;
  nmt?: boolean;
  nmb?: boolean;
}

export function Divider(props: IDividerProps)
{
  const { isVertical = false, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;

  const styleDiv: CSSProperties = {
    borderTopStyle: lineStyle,
    borderTopWidth: lineThickness,
    borderTopColor: BorderPropertiesHelper.getBorderColorPropsValue(lineColor) ?? CssVariables.BorderColor,
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props)
  };

  if (nml)
  {
    styleDiv.marginLeft = MarginSizes.Default.toCssNegative(props.ml);
  }

  if (nmr)
  {
    styleDiv.marginRight = MarginSizes.Default.toCssNegative(props.mr);
  }

  if (nmt)
  {
    styleDiv.marginTop = MarginSizes.Default.toCssNegative(props.mt);
  }

  if (nmb)
  {
    styleDiv.marginBottom = MarginSizes.Default.toCssNegative(props.mb);
  }

  const dividerClass = css({ ...styleDiv, label: 'Divider' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={dividerClass} {...domProps}>
      {children}
    </div>
  );
}
