import { css } from '@emotion/css';
import { TColorToken } from 'lotus-core/modules/color';
import { ComponentPropsWithRef, CSSProperties, useMemo } from 'react';
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
  lineColor?: TCssBorderColor | TColorToken;
  nml?: boolean;
  nmr?: boolean;
  nmt?: boolean;
  nmb?: boolean;
}

export function Divider(props: IDividerProps) 
{
  const { isVertical = false, lineStyle = 'solid', lineColor, lineThickness = '1px', nml, nmr, nmt, nmb, children, ...otherProps } = props;

  // 1. Мемоизируем объект стилей
  const dividerStyle = useMemo((): CSSProperties => 
  {
    const color = BorderPropertiesHelper.getBorderColorPropsValue(lineColor) ?? CssVariables.BorderColor;

    const styles: CSSProperties = {
      // Динамическое переключение границы в зависимости от ориентации
      borderTop: !isVertical ? `${lineThickness} ${lineStyle} ${color}` : undefined,
      borderLeft: isVertical ? `${lineThickness} ${lineStyle} ${color}` : undefined,
      height: isVertical ? '100%' : undefined,
      width: !isVertical ? '100%' : undefined,
      display: isVertical ? 'inline-block' : 'block',

      ...MarginPropertiesHelper.createMarginProps(otherProps),
      ...PaddingPropertiesHelper.createPaddingProps(otherProps)
    };

    // Обработка отрицательных маржинов (Negative Margins)
    if (nml) styles.marginLeft = MarginSizes.Default.toCssNegative(otherProps.ml);
    if (nmr) styles.marginRight = MarginSizes.Default.toCssNegative(otherProps.mr);
    if (nmt) styles.marginTop = MarginSizes.Default.toCssNegative(otherProps.mt);
    if (nmb) styles.marginBottom = MarginSizes.Default.toCssNegative(otherProps.mb);

    return styles;
  }, [otherProps, isVertical, lineStyle, lineColor, lineThickness, nml, nmr, nmt, nmb]);

  // 2. Мемоизируем сгенерированный класс Emotion
  const dividerClass = useMemo(() => css({ ...dividerStyle, label: isVertical ? 'Divider-v' : 'Divider-h' }), [dividerStyle, isVertical]);

  // 3. Фильтруем кастомные пропсы перед передачей в div
  const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);

  return (
    <div className={dividerClass} {...domProps}>
      {children}
    </div>
  );
}
