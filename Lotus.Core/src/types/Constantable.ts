/**
 * Интерфейс для поддержки константных объектов
 */
export interface IConstantable
{
  /**
   * Статус константного объекта
   */
  isConst?: boolean;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IConstantable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfConstantable(value: unknown): value is IConstantable
{
  if (value && typeof value === 'object')  
  {
    return ('isConst' in value) && value.isConst === true;
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IConstantable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToConstantable(value: unknown): IConstantable | undefined
{
  if (instanceOfConstantable(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}