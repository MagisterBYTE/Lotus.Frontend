import { MantineThemeOverride } from '@mantine/core';
import { TSizeType } from './SizeType';

/**
 * Базовые свойства контекста-рендера элемента которые передаются в предметную область
 */
export interface IContextRenderBase
{
  /**
   * Статус недоступности/доступности элемента
   */
  disabled?: boolean;

  /**
   * Размер элемента
   */
  size?: TSizeType;

  /**
   * Текущая тема
   */
  theme?: MantineThemeOverride
}