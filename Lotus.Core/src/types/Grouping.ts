
/**
 * Интерфейс для группирования объектов
 */

export interface IGrouping<TItem extends object = object>
{
  /**
   * Ключ для группирования
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupKey: any;

  /**
   * Массив элементов
   */
  items: TItem[];
}

/**
 * Проверка объекта на поддержку интерфейса {@link IGrouping}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfGrouping(value: unknown): value is IGrouping
{
  if (value && typeof value === 'object')
  {
    return 'groupKey' in value && 'items' in value && Array.isArray(value['items']);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IGrouping}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToGrouping(value: unknown): IGrouping | undefined
{
  if (instanceOfGrouping(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}
