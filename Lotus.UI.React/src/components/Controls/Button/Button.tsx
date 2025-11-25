/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Colors } from 'lotus-core/modules/color';
import React, { ComponentPropsWithRef, CSSProperties, useEffect, useState } from 'react';
import { IGeneralIconProperties } from '#base';
import { useRippleEffect } from '#hooks';
import { IInteractivityBackgroundEffect, IInteractivityElementProperties } from '#interactivity';
import { Theme } from '#theme';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps extends ComponentPropsWithRef<'button'>, IGeneralIconProperties, IInteractivityElementProperties, IInteractivityBackgroundEffect
{
  /**
   * Стиль для кнопки
   */
  overrideButtonStyle?: CSSProperties;

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

export const Button: React.FC<IButtonProps> = (props: IButtonProps) =>
{
  const
    {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor, hoverTextColor, pressedTextColor,
      backColor, backImage, hoverBackColor, pressedBackColor,
      borderRadius, borderStyle, borderWidth, borderColor, hoverBorderColor, pressedBorderColor,
      size = 'medium', extraClass,
      overrideButtonStyle, variant = 'filled', isSelectedStatus, isSelected, onSelected,
      icon, iconColor, iconStyle, iconPlacement = 'left', imageDatabase,
      hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect,
      ...propsButton
    } = props;

  const [selectedButton, setSelectedButton] = useState<boolean | undefined>(isSelected);

  // const cssProperties = CssPropertiesBuilder.buildInteractivityElement(variant, props, { isSelected: selectedButton });

  // if(overrideButtonStyle)
  // {
  //   CssPropertiesHelper.overrideStyle(cssProperties, overrideButtonStyle);
  // }

  // const buttonClass = css({ ...cssProperties })

  const rippleColor = Colors.red_2.toCSSRgbValue();
  const [ripple, event] = useRippleEffect({ duration: Theme.TransitionSpeed * 2, color: rippleColor, disabled: props.disabled });

  // const getFlexContainer = (): CSSProperties =>
  // {
  //   switch (iconPlacement)
  //   {
  //     case 'left': return CssContainerHelper.getFlexRowContainer(size, paddingControl);
  //     case 'right': return CssContainerHelper.getFlexRowContainer(size, paddingControl, true);
  //     case 'top': return CssContainerHelper.getFlexColumnContainer(size, paddingControl);
  //     case 'bottom': return CssContainerHelper.getFlexColumnContainer(size, paddingControl, true);
  //   }

  //   return {};
  // }

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
  {
    setSelectedButton(!selectedButton);

    if (onSelected) onSelected(!selectedButton, event.currentTarget.value);

    if (props.onClick) props.onClick(event);
  };

  useEffect(() =>
  {
    setSelectedButton(isSelected);
  }, [isSelected]);

  // if (icon)
  // {
  //   return (<button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
  //     onClick={isSelectedStatus ? handleSelect : props.onClick}
  //     onPointerDown={event}>
  //     {/* {RenderComponentHelper.renderIconAndValue(size, icon, propsButton.children, iconStyle, iconColor, imageDatabase, true, getFlexContainer())} */}
  //   </button>);
  // }
  // else
  // {
  //   return (
  //     <button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
  //       onClick={isSelectedStatus ? handleSelect : props.onClick}
  //       onPointerDown={event}>
  //       {propsButton.children}
  //     </button>);
  // }
  return <></>;
};
