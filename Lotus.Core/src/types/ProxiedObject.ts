
/**
 * Прокси интерфейс служащий оболочкой над реальным объектом
 */
export interface IProxiedObject<TType>
{
  /**
   * Реальный объект
   */
  object: TType;

  /**
   * Функция для обновления прокси
   * @param sender Источник обновления
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refresh: (sender?: any) => void;
}
