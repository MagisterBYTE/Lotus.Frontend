
/**
 *  Определение интерфейса для объектов реализующих понятие имени для для отображение в интерфейсе
 */
export interface IDisplayNameable
{
  /**
   * Имя объекта для отображение в интерфейсе
   */
  displayName: string;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IDisplayNameable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfDisplayNameable(value: unknown): value is IDisplayNameable
{
  if (value && typeof value === 'object')
  {
    return ('displayName' in value && typeof value.displayName === 'string');
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IDisplayNameable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToDisplayNameable(value: unknown): IDisplayNameable | undefined
{
  if (instanceOfDisplayNameable(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}