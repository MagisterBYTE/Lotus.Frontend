 
import { css } from '@emotion/css';
import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { ComponentPropsWithRef, CSSProperties, useMemo } from 'react';
import
{
  BorderPropertiesHelper,
  ContainerPropertiesHelper,
  IGeneralContainerProperties,
  IGeneralTextProperties,
  MarginPropertiesHelper,
  PaddingPropertiesHelper,
  TextPropertiesHelper
} from '#base';
import { DesignSystemConstants } from '#designSystem';
import { CssPropertiesHelper } from '#helpers';
import { TCssBackgroundColor } from '#types';

export interface ITextProps extends IGeneralContainerProperties, IGeneralTextProperties, ComponentPropsWithRef<'div'>
{
  /**
   * Блоковый или строчный элемент
   */
  isBlock?: boolean;

  /**
   * Если указан цвет, показывать как badge
   */
  asBadge?: TCssBackgroundColor | TColorToken;

  /**
   * Статус недоступности
   */
  disabled?: boolean;
}

export function Text(props: ITextProps)
{
  const { isBlock = false, asBadge, disabled, children, ...otherProps } = props;

  const isBadge = Assert.existValue(asBadge);
  const isDisabled = Boolean(disabled);

  // 1. Мемоизируем объект стилей
  const textStyle = useMemo((): CSSProperties => (
    {
      lineHeight: 'normal',
      display: isBlock ? 'block' : 'inline-block',
      ...MarginPropertiesHelper.createMarginProps(otherProps),
      ...PaddingPropertiesHelper.createPaddingProps(otherProps),
      ...ContainerPropertiesHelper.createContainerProps(otherProps),
      ...BorderPropertiesHelper.createBorderProps(otherProps),
      ...BorderPropertiesHelper.createBorderShadowProps(otherProps),
      ...TextPropertiesHelper.createTextProps(otherProps, isDisabled ? DesignSystemConstants.OpacityForDisabled : undefined),

      backgroundColor: isBadge ? ColorCssHelper.getColorWithAlpha(asBadge, DesignSystemConstants.OpacityForBadge) : undefined
    }),
  [props, isBlock, isBadge, isDisabled]
  );

  // 2. Мемоизируем сгенерированный класс Emotion
  const textClass = useMemo(() => css({ ...textStyle, label: 'Text' }), [textStyle]);

  // 3. Фильтруем кастомные пропсы перед передачей в div
  const domProps = useMemo(() => CssPropertiesHelper.filterDOMProps(otherProps), [otherProps]);

  return (
    <div className={textClass} {...domProps}>
      {children}
    </div>
  );
}
