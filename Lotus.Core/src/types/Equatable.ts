
/**
 * Интерфейс для реализации сравнения объектов на равенство.
 */
export interface IEquatable<TType>
{
  equal: (other: TType) => boolean;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IEquatable}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfEquatable<TDatasaveType extends object>(value: unknown): value is IEquatable<TDatasaveType>
{
  if (value && typeof value === 'object')
  {
    return 'equal' in value && typeof value.equal === 'function';
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IEquatable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToEquatable<TDatasaveType extends object>(value: unknown): IEquatable<TDatasaveType> | undefined
{
  if (instanceOfEquatable<TDatasaveType>(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}