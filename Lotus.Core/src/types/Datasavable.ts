
/**
 * Интерфейс для объектов, которые могут быть сохранены в виде данных.
 */
export interface IDatasavable<TDatasaveType extends object>
{
  toDatasave: () => TDatasaveType;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IDatasavable}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfDatasavable<TDatasaveType extends object>(value: unknown): value is IDatasavable<TDatasaveType>
{
  if (value && typeof value === 'object')
  {
    return 'toDatasave' in value && typeof value.toDatasave === 'function';
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IDatasavable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToDatasavable<TDatasaveType extends object>(value: unknown): IDatasavable<TDatasaveType> | undefined
{
  if (instanceOfDatasavable<TDatasaveType>(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}
