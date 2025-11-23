/**
 * Определение интерфейса для представления ответа/результата выполнения операции
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResult<TData = any>
{
  /**
   * Статус успешности выполнения метода
   */
  succeeded: boolean;

  /**
   * Код
   */
  code: number|string;

  /**
   * Сообщение о результате выполнения операции
   */
  message?: string;

  /**
   * Дополнительные данные
   */
  data?: TData;
}

/**
 * Проверка объекта на поддержку интерфейса IResult
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfResult(value: any): value is IResult
{
  if (value && typeof value === 'object')
  {
    return ('succeeded' in value) && ('code' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу IResult 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function castToResult(value: any): IResult | undefined
{
  if (instanceOfResult(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}