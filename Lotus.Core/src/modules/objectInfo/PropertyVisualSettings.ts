
/**
 * Интерфейс для визуальных настроек свойства
 */
export interface IPropertyVisualSettings
{
  /**
   * Ширина компонента свойства (по умолчанию 100 px)
   */
  size?: number;

  /**
   * Дополнительные пропсы компонента для просмотра
   */
  // oxlint-disable-next-line typescript/no-explicit-any
  propsView?: any;

  /**
   * Дополнительные пропсы компонента для редактирования
   */
  // oxlint-disable-next-line typescript/no-explicit-any
  propsEdit?: any;
}