import { memo, useMemo } from 'react';
import { IGeneralTextProperties, TextPropertiesHelper } from '#base';
import { DesignSystemConstants } from '#designSystem';

export interface ISpanProps extends IGeneralTextProperties 
{
  /**
   * Текст
   */
  text: string;
  /**
   * Статус недоступности
   */
  disabled?: boolean;
}

export const Span = memo((props: ISpanProps) => 
{
  const spanStyle = useMemo(() => TextPropertiesHelper.createTextProps(props, props.disabled ? DesignSystemConstants.OpacityForDisabled : undefined), [props]);
  return <span style={spanStyle}>{props.text}</span>;
});

// Назначаем имя для отладки в DevTools
Span.displayName = 'Span';
