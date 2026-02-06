
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderFunction = (item: unknown, context?: unknown) => any

/**
 * Интерфейс для отрисовки свойства
 */
export interface IPropertyRendering
{
  /**
   * Статус включенности отрисовки свойства
   */
  enabled?: boolean;

  /**
   * Функция для отрисовки поля/свойства
   */
  renderField: RenderFunction;

  /**
   * Функция для отрисовки всего объекта
   */
  renderObject?: RenderFunction;
}