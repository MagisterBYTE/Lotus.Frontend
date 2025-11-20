import { IGeneralBorderProperties, IGeneralContainerProperties } from '#base';
import { CssBorderHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { TThemeColor } from '#theme/types';
import { TCssBorderStyle, TCssBorderWidth } from '#types';
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';

export interface IDividerProps extends Omit<IGeneralContainerProperties, keyof IGeneralBorderProperties>, ComponentPropsWithRef<'div'>
{
  isVertical?: boolean;
  lineStyle?: TCssBorderStyle;
  lineThickness?: TCssBorderWidth;
  lineColor?: TThemeColor;
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
    borderTopColor: CssBorderHelper.getBorderColorPropsValue(lineColor),
    ...CssSpacingHelper.getPaddingProps(props),
    ...CssSpacingHelper.getMarginProps(props),
  };

  if (Boolean(nml))
  {
    styleDiv.marginLeft = CssSpacingHelper.getMarginPropsValue(props.ml, true);
  }

  if (Boolean(nmr))
  {
    styleDiv.marginRight = CssSpacingHelper.getMarginPropsValue(props.mr, true);
  }

  if (Boolean(nmt))
  {
    styleDiv.marginTop = CssSpacingHelper.getMarginPropsValue(props.mt, true);
  }

  if (Boolean(nmb))
  {
    styleDiv.marginBottom = CssSpacingHelper.getMarginPropsValue(props.mb, true);
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
