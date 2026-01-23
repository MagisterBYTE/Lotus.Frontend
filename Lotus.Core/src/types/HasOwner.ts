/**
 * Интерфейс для определения обязательного отношения 'владелец' 
 */
export interface IHasRequiredOwner<TOwner extends object = object>
{
  /**
   * Владелец
   */
  owner: TOwner;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IHasRequiredOwner}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfHasRequiredOwner(value: unknown): value is IHasRequiredOwner
{
  if (value && typeof value === 'object')
  {
    return 'owner' in value && typeof value.owner === 'object';
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IHasRequiredOwner}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToHasRequiredOwner(value: unknown): IHasRequiredOwner | undefined
{
  if (instanceOfHasRequiredOwner(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}
