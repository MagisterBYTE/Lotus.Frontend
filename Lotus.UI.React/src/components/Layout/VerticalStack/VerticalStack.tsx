import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties, useMemo } from 'react';
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

export interface IVerticalStackProps extends IGeneralContainerProperties, IGeneralBackgroundProperties, ComponentPropsWithRef<'div'> {
  spacing?: TCssGap | TSizeType;
  hAlign?: TCssAlignItems;
  vAlign?: TCssJustifyContent;
  wrap?: boolean;
}

export function VerticalStack(props: IVerticalStackProps) 
{
  const { spacing, vAlign = 'flex-start', hAlign, wrap = false, children, ...otherProps } = props;

  // 1. Мемоизируем объект стилей
  const stackStyle = useMemo((): CSSProperties => 
  {
    const gapValue = GapSizes.getFromCssVariable(spacing);
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: hAlign,
      justifyContent: vAlign,
      rowGap: gapValue,
      columnGap: gapValue,
      flexWrap: wrap ? 'wrap' : 'nowrap',

      ...MarginPropertiesHelper.createMarginProps(otherProps),
      ...PaddingPropertiesHelper.createPaddingProps(otherProps),
      ...ContainerPropertiesHelper.createContainerProps(otherProps),
      ...BackgroundPropertiesHelper.createBackgroundProps(otherProps),
      ...BackgroundPropertiesHelper.createBoxShadowProps(otherProps),
      ...BorderPropertiesHelper.createBorderProps(otherProps),
      ...BorderPropertiesHelper.createBorderShadowProps(otherProps)
    };
  }, [otherProps, spacing, vAlign, hAlign, wrap]);

  // 2. Мемоизируем сгенерированный класс Emotion
  const stackClass = useMemo(() => css({ ...stackStyle, label: 'VerticalStack' }), [stackStyle]);

  // 3. Фильтруем кастомные пропсы перед передачей в div
  const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);

  return (
    <div className={stackClass} {...domProps}>
      {children}
    </div>
  );
}
