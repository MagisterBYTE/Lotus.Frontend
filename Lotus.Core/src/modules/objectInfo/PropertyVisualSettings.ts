
/**
 * Интерфейс для визуальных настроек свойства
 */
export interface IPropertyVisualSettings
{
  /**
   * Ширина компонента своиства (по умолчанию 100 px)
   */
  size?: number;

  /**
   * Дополнительные пропсы компонента для просмотра
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propsView?: any;

  /**
   * Дополнительные пропсы компонента для редактирования
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propsEdit?: any;
}