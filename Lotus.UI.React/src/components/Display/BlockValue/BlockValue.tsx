 
/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { ComponentPropsWithRef, CSSProperties } from 'react';
import { IGeneralBorderProperties, IGeneralContainerProperties } from '#base';
import { CssBorderHelper, CssContainerHelper, CssFontHelper, CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { TThemeColor } from '#theme/types';

export interface IBlockValueProps extends IGeneralContainerProperties, ComponentPropsWithRef<'div'> {
  /**
   * Название свойства
   */
  label: React.ReactNode;
  /**
   * Значение свойства
   */
  value: React.ReactNode;
  /**
   * Цвет акцента (для левой границы и заголовка)
   */
  accentColor?: string;
  /**
   * Дополнительные стили для значения
   */
  valueStyle?: React.CSSProperties;

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
  const { label, value, accentColor = '#2196F3', valueStyle, className = '', asBadge = false, monospaceValue = false, ...otherProps } = props;

  const styleBaseContainer: CSSProperties = {
    background: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    borderLeft: `4px solid ${accentColor}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    // ...CssSpacingHelper.getPaddingProps(props),
    // ...CssSpacingHelper.getMarginProps(props),
    // ...CssContainerHelper.getContainerProps(props)
  };

  const styleLabelBase: React.CSSProperties = {
    color: accentColor,
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const styleValueBase: React.CSSProperties = {
    color: '#333',
    fontWeight: 600,
    fontSize: '13px',
    wordBreak: 'break-all' as const,
    ...(monospaceValue && { fontFamily: '\'Monaco\', \'Consolas\', monospace' }),
    ...valueStyle
  };

  const styleBadge: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 600,
    fontSize: '13px',
    border: `1px solid ${accentColor}80` // 80 = 50% прозрачность
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => 
  {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => 
  {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
  };

  const blockValueClass = css({ ...styleBaseContainer, label: 'BlockValue' });

  // Фильтруем кастомные пропсы перед передачей в div
  const domProps = CssPropertiesHelper.filterDOMProps(otherProps);

  return (
    <div className={blockValueClass} {...domProps}
      aria-label={`${label}: ${typeof value === 'string' ? value : 'value block'}`}
      role="region"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <strong style={styleLabelBase}>{label}</strong>
      
      {asBadge ? (
        <span style={{ ...styleBadge, background: `${accentColor}20` }}>
          {value}
        </span>
      ) : (
        <div style={styleValueBase}>{value}</div>
      )}
    </div>
  );
}
