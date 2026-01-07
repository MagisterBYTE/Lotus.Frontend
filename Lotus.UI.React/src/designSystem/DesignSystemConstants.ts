/**
 * Константы дизайн-системы
 */
export abstract class DesignSystemConstants
{
  /**
   * Ключ под которым сохраняется тема сайта
   */
  public static readonly SaveKey: string = 'lotus-design-system';

  /**
   * Названия атрибута в документа под которым сохраняется цветовая схема сайта
   */
  public static readonly DataAttributeColorScheme: string = 'data-lotus-color-scheme';

  /**
   * Названия атрибута в документа под которым сохраняется основной цвет сайта
   */
  public static readonly DataAttributePrimaryColor: string = 'data-lotus-primary-color';

  //
  // ШРИФТ
  //
  /**
   * Шрифт по умолчанию
   */
  public static readonly FontDefault: string = 'Verdana, Geneva, Tahoma, sans-serif';

  /**
   * Шрифт для акцента
   */
  public static readonly FontAccent: string = 'Arial, Helvetica, sans-serif';

  /**
   * Моноширинный шрифт
   */
  public static readonly FontMonospace: string = 'Consolas, Courier New';

  //
  // Transition
  //
  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeed: number = 400;

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeedFast: number = 250;

  //
  // Opacity
  //
  /**
   * Прозрачность для элементов UI которые недоступны
   */
  public static readonly OpacityForDisabled: number = 0.65;

  /**
   * Прозрачность тени для границы элементов UI которые при наведении
   */
  public static readonly OpacityForBorderShadowHover: number = 0.2;

  /**
   * Прозрачность тени для границы элементов UI которые при активном состоянии
   */
  public static readonly OpacityForBorderShadowActive: number = 0.4;
}