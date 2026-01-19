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
  code?: number|string;

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
 * Произвольный текст ответа/результата операции
 */
export interface IResultMessage 
{
  /**
   * Условный уровень текста
   * @description В зависимости от контекста, уровень текста может по-разному интерпретироваться или его вообще не может быть
   */
  level?: number|string;

  /**
   * Произвольный текст.
   */
  text: string;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IResult}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */

export function instanceOfResult(value: unknown): value is IResult
{
  if (value && typeof value === 'object')
  {
    return ('succeeded' in value && typeof value['succeeded'] === 'boolean');
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IResult} 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToResult(value: unknown): IResult | undefined
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