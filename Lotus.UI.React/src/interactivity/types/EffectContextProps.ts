/**
 * Контекст элемента UI для применения визуального эффекта
 */
export interface IEffectContextProps
{
  /**
   * Элемент находиться в статусе выбора
   */
  isSelected?: boolean;

  /**
   *  Элемент не доступен
   */
  isDisabled?: boolean; 

  /**
   *  Элемент находиться в фокусе
   */
  isFocused?: boolean;

  /**
   * Нужно ли применять Ripple Effect
   */
  hasRippleEffect?: boolean;
}