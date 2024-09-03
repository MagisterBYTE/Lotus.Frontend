export class ThemeConstants
{
  /**
   * Ключ под которым сохраняется тема сайта
   */
  public static readonly SaveKey: string = 'lotus-theme';

  /**
   * Названия атрибута в документа под которым сохраняется тема сайта
   */
  public static readonly DataAttribute: string = 'data-theme';

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeed: number = 400;

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeedFast: number = 250;

  /**
   * Прозрачность для элементов UI которые недоступны
   */
  public static readonly OpacityForDisabled: number = 0.65;
}