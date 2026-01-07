import { css } from '@emotion/css';
import { Assert } from 'lotus-core/utils';
import React, { ComponentPropsWithRef, CSSProperties, useEffect, useState } from 'react';
import { ContainerPropertiesHelper, IGeneralElementProperties, IGeneralIconProperties } from '#base';
import { CssPropertiesHelper } from '#helpers';
import { IEffectContextProps, IInteractivityBackgroundEffect, IInteractivityElementProperties } from '#interactivity';
import { RenderIcon } from '#render';
import { TCssGap, TIconPlacement, TSizeType } from '#types';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps
  extends ComponentPropsWithRef<'button'>,
  IGeneralElementProperties,
  IGeneralIconProperties,
  IInteractivityElementProperties,
  IInteractivityBackgroundEffect
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;

  /**
   * Статус возможности выбора
   */
  isSelectedStatus?: boolean;

  /**
   * Статус выбора
   */
  isSelected?: boolean;

  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selected Статус выбора
   * @param value Выбранное значение
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelected?: (selected: boolean, value?: any) => void;
}

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

export const Button: React.FC<IButtonProps> = (props: IButtonProps) =>
{
  const {
    variant = 'filled',
    isSelectedStatus,
    isSelected,
    onSelected,
    hasRippleEffect,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasScaleEffect,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasShadowBorderEffect,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasShadowBoxEffect,
    icon,
    iconSize,
    iconPlacement,
    iconStyle,
    iconColor,
    imageDatabase,
    disabled,
    onClick,
    children,
    ...propsButton
  } = props;

  const isIcon = Assert.existValue(icon);

  const [selectedButton, setSelectedButton] = useState<boolean | undefined>(isSelected);

  const context: IEffectContextProps = {
    isSelected: selectedButton,
    isDisabled: disabled,
    hasRippleEffect: hasRippleEffect
  };

  let cssProperties = CssPropertiesHelper.buildInteractivityElement(variant, props, context);
  if (isIcon)
  {
    cssProperties = { ...cssProperties, ...getFlexContainer(iconPlacement, 'md') };
    cssProperties.display = 'flex';
  }

  // const rippleColor = Colors.red_2.toCSSRgbValue();
  // const [ripple, event] = useRippleEffect({ duration: DesignSystemConstants.TransitionSpeed * 2, color: rippleColor, disabled: props.disabled });

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
  {
    setSelectedButton(!selectedButton);

    if (onSelected) onSelected(!selectedButton, event.currentTarget.value);

    if (onClick) onClick(event);
  };

  useEffect(() =>
  {
    setSelectedButton(isSelected);
  }, [isSelected]);

  const buttonClass = css({ ...cssProperties, label: 'Button' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(propsButton);

  if (isIcon)
  {
    return (
      <button className={buttonClass} {...domProps} onClick={isSelectedStatus ? handleSelect : onClick}>
        {RenderIcon.renderIcon(iconSize ?? 'md', icon, undefined, iconStyle, iconColor, imageDatabase)}
        {children}
      </button>
    );
  }
  else
  {
    return (
      <button className={buttonClass} {...domProps} onClick={isSelectedStatus ? handleSelect : onClick}>
        {children}
      </button>
    );
  }
};
