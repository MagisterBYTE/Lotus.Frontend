import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface IHorizontalStackProps extends ComponentPropsWithoutRef<'div'>
{
  gap?: React.CSSProperties['gap'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
  children: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const HorizontalStack = forwardRef<HTMLDivElement, IHorizontalStackProps>((props, ref) => 
{
  const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props
  return (
    <div ref={ref} {...divProps} style={{
      display: 'flex',
      flexDirection: 'row',
      gap: gap,
      alignItems: alignItems ?? 'baseline',
      justifyContent: justifyContent ?? 'flex-start',
      flexWrap: wrap,
      width: fullWidth ? '100%' : divProps.style?.width,
      height: fullHeight ? '100%' : divProps.style?.width,
      ...divProps.style
    }}>
      {children}
    </div>
  );
}
)