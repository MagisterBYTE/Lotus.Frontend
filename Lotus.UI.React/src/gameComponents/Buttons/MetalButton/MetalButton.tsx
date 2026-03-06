import { ComponentPropsWithRef } from 'react';
import { TButtonVariant } from '../types';
import classes from './MetalButton.module.css';

export interface IMetalButtonProps extends ComponentPropsWithRef<'button'>
{
    variant?: TButtonVariant;
}

export function MetalButton(props: IMetalButtonProps) 
{
  const { children, className, variant = 'default', ...buttonProps } = props;
    
  // Объединяем базовый класс, класс варианта и внешний className, если он есть
  const combinedClasses = [classes.button, classes[variant] || '', className].join(' ').trim();

  return (
    <button className={combinedClasses} {...buttonProps}>
      <div className={classes.content}>
        {children}
      </div>
    </button>
  );
}