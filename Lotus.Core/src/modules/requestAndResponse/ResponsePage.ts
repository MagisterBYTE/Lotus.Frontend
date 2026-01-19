import { instanceOfResult } from '#types';
import { IPageInfoResponse } from './PageInfo';
import { IResponse } from './Response';

/**
 * Интерфейс для постраничного получения данных
 */
export interface IResponsePage<TPayload = unknown> extends Omit<IResponse<TPayload>, 'payload'>
{
  /**
  * Данные
  */
  payload?: TPayload[];

  /**
   * Информация о странице
   */
  pageInfo?: IPageInfoResponse;
}

/**
 * Проверка объекта на поддержку интерфейса {@link IResponsePage}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */

export function instanceOfResponsePage(value: unknown): value is IResponsePage
{
  if (value && typeof value === 'object')
  {
    return ('result' in value && instanceOfResult(value['result']) && 'payload' in value && Array.isArray(value['payload']) && 'pageInfo' in value);
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link IResponsePage} 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToResponsePage(value: unknown): IResponsePage | undefined
{
  if (instanceOfResponsePage(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}