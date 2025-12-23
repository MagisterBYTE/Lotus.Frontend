import { TKey } from '#types';

/**
 * Определение шаблона интерфейса для идентификации сущности через уникальный идентификатор-ключ.
 * @typeparam TypeId - Тип идентификатора.
 */
export interface IIdentifierId<TypeId = TKey> {

  /**
   * Ключ сущности
   */
  id: TypeId;
}

/**
 * Проверка объекта на поддержку интерфейса IIdentifierId
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfIdentifierId(value: unknown): value is IIdentifierId
{
  if (value && typeof value === 'object')
  {
    return ('id' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IIdentifierId
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToIdentifierId(value: unknown): IIdentifierId | undefined
{
  if (instanceOfIdentifierId(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}