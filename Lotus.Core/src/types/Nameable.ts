
/**
 *  Определение интерфейса для объектов реализующих понятие имени
 */
export interface INameable
{
  /**
   * Имя объекта
   */
  name: string;
}

/**
 * Проверка объекта на поддержку интерфейса {@link INameable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfNameable(value: unknown): value is INameable
{
  if (value && typeof value === 'object')
  {
    return ('name' in value && typeof value.name === 'string');
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link INameable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToNameable(value: unknown): INameable | undefined
{
  if (instanceOfNameable(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}