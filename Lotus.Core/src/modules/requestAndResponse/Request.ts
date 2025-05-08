import { IFilterPropertyCollection } from './FilterProperty';
import { IPageInfoRequest } from './PageInfo';
import { ISortPropertyCollection } from './SortProperty';

/**
 * Базовый интерфейс для запроса данных
 */
export interface IRequest
{
  /**
   * Параметры запрашиваемой страницы
   */
  pageInfo?: IPageInfoRequest;

  /**
   * Параметры фильтрации данных
   */
  filtering?: IFilterPropertyCollection;

  /**
   * Параметры сортировки данных
   */
  sorting?: ISortPropertyCollection;
}