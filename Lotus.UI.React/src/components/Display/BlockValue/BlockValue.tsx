 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { ColorCssHelper, TColorToken } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import { BorderPropertiesHelper, ContainerPropertiesHelper, IGeneralContainerProperties, MarginPropertiesHelper, PaddingPropertiesHelper, TBorderSideSet } from '#base';
import { CssPropertiesHelper } from '#helpers';
import { TCssColor, TSizeType } from '#types';
import { ILabelProps, Label } from '../Label';

export interface IBlockValueProps extends IGeneralContainerProperties, ComponentPropsWithRef<'div'> 
{
  /**
   * Размер элемента
   */
  size?: TSizeType; 

  /**
   * Название свойства
   */
  label: React.ReactNode;

  /**
   * Пропсы для надписи
   */
  labelProps?: ILabelProps

  /**
   * Значение свойства
   */
  value: React.ReactNode;

  /**
   * Пропсы для надписи
   */
  valueProps?: ILabelProps

  /**
   * Цвет акцента (для левой границы и заголовка)
   */
  accentColor?: TCssColor|TColorToken;

  /**
   * Цвет акцента фона
   */
  accentBackground?: boolean;

  /**
   * Если true, показывать как badge
   */
  asBadge?: boolean;
  /**
   * Если true, использовать моноширинный шрифт для значения
   */
  monospaceValue?: boolean;
}

export function BlockValue(props: IBlockValueProps) 
{
  const { size = 'md', label, labelProps, value, valueProps, accentColor = 'blueGray', accentBackground = false, 
    asBadge = false, monospaceValue = false, ...otherProps } = props;

  // Радиус отключен
  if (Assert.emptyValue(otherProps.withBorder))
  {
    // if (Assert.emptyValue(otherProps.bdRadius)) otherProps.bdRadius = size;
    if (Assert.emptyValue(otherProps.withBorder)) otherProps.withBorder = true;
  }

  const modifyProps = { ...otherProps };
  modifyProps.withBorder = TBorderSideSet.Right|TBorderSideSet.Top|TBorderSideSet.Bottom;

  const styleBaseContainer: CSSProperties = {
    background: accentBackground ? ColorCssHelper.getColorCssWithAlpha(accentColor, 0.1) : '(var --mantine-color-body)',
    borderLeft: `4px solid ${ColorCssHelper.getColorCss(accentColor)}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    width: 'max-content',
    ...MarginPropertiesHelper.createMarginProps(props),
    ...PaddingPropertiesHelper.createPaddingProps(props),
    ...ContainerPropertiesHelper.createContainerProps(props),
    ...BorderPropertiesHelper.createBorderProps(modifyProps),
    ...BorderPropertiesHelper.createBorderShadowProps(props)
  };

  const blockValueClass = css({ ...styleBaseContainer, label: 'BlockValue' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={blockValueClass} {...domProps}>
      <Label fontBold={true} fontSize={size} isBlock={true}
        mb={size}
        textColor={accentColor}
        {...labelProps}>{label}</Label>
      <Label asBadge={asBadge ? accentColor : undefined} bdRadius={asBadge ? (valueProps?.bdRadius ?? size) : undefined}
        fontSize={size}
        isBlock={true}
        p={asBadge ? (valueProps?.p ?? otherProps.p ?? size) : undefined}
        {...valueProps}>{value}</Label>
    </div>
  );
}
