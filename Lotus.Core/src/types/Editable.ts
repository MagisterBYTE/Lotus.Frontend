import { TKey } from './Key';

/**
 * Интерфейс для поддержки редактируемых объектов
 */
export interface IEditable
{
  /**
   * Идентификатор объекта
   */
  id: TKey;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IEditable}
 * @param value Проверяемый объект
 * @returns true, если объект поддерживает интерфейс, false в противном случае
 */
export function instanceOfEditable(value: unknown): value is IEditable
{
  if (value && typeof value === 'object')
  {
    return ('id' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IEditable}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToEditable(value: unknown): IEditable | undefined
{
  if (instanceOfEditable(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}