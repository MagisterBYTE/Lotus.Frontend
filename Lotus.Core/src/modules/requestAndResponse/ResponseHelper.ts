import { IResult } from '#types';
import { Assert } from '#utils';
import { IPageInfoRequest, IPageInfoResponse } from './PageInfo';
import { IResponse } from './Response';
import { IResponsePage } from './ResponsePage';

/**
 * Вспомогательный класс для работы с интерфейсом для получения данных
 */
export abstract class ResponseHelper 
{
  /**
   * Проверка на успешный ответ
   * Успешный ответ считается если result undefined или result успешный
   * @param response
   */
  public static succeed(response: IResponse): boolean 
  {
    return Boolean(Assert.emptyValue(response.result) || (response.result && response.result.succeeded));
  }

  /**
   * Преобразует полезную нагрузку (payload) ответа с использованием синхронной функции преобразования
   * @template TSource - Исходный тип полезной нагрузки
   * @template TDest - Целевой тип полезной нагрузки после преобразования
   * @param {IResponse<TSource>} response - Исходный объект ответа
   * @param {(payload: TSource) => TDest} onTransform - Функция преобразования полезной нагрузки
   * @returns {IResponse<TDest>} Новый объект ответа с преобразованной полезной нагрузкой
   * @description Создает новый объект ответа, сохраняя исходный результат (result)
   * и применяя функцию преобразования к полезной нагрузке
   */
  public static transform<TSource, TDest>(response: IResponse<TSource>, onTransform: (payload: TSource) => TDest): IResponse<TDest> 
  {
    const responseNew: IResponse<TDest> = {
      result: response.result,
      payload: onTransform(response.payload!)
    };

    return responseNew;
  }

  /**
   * Асинхронно преобразует полезную нагрузку ответа с использованием функции преобразования
   * @template TSource - Исходный тип полезной нагрузки
   * @template TDest - Целевой тип полезной нагрузки после преобразования
   * @param {Promise<IResponse<TSource>>} responsePromise - Промис, возвращающий исходный объект ответа
   * @param {(payload: TSource) => TDest} onTransform - Функция преобразования полезной нагрузки
   * @returns {Promise<IResponse<TDest>>} Промис, который разрешается в новый объект ответа с преобразованной полезной нагрузкой
   * @description Ожидает разрешения промиса с ответом, затем применяет синхронное преобразование
   */
  public static async transformAsync<TSource, TDest>(
    responsePromise: Promise<IResponse<TSource>>,
    onTransform: (payload: TSource) => TDest
  ): Promise<IResponse<TDest>> 
  {
    const response = await responsePromise;
    return ResponseHelper.transform(response, onTransform);
  }

  /**
   * Преобразует полезную нагрузку постраничного ответа с использованием синхронной функции преобразования
   * @template TSource - Исходный тип элементов массива полезной нагрузки
   * @template TDest - Целевой тип элементов массива полезной нагрузки после преобразования
   * @param {IResponsePage<TSource>} response - Исходный объект постраничного ответа
   * @param {(payload: TSource) => TDest} onTransform - Функция преобразования элементов массива
   * @returns {IResponsePage<TDest>} Новый объект постраничного ответа с преобразованными элементами массива
   * @description Создает новый постраничный ответ, применяя функцию преобразования
   * к каждому элементу массива полезной нагрузки и сохраняя информацию о странице
   */
  public static transformPage<TSource, TDest>(response: IResponsePage<TSource>, onTransform: (payload: TSource) => TDest): IResponsePage<TDest> 
  {
    return {
      ...response,
      payload: response.payload?.map((item) => onTransform(item))
    };
  }

  /**
   * Асинхронно преобразует полезную нагрузку постраничного ответа с использованием функции преобразования
   * @template TSource - Исходный тип элементов массива полезной нагрузки
   * @template TDest - Целевой тип элементов массива полезной нагрузки после преобразования
   * @param {Promise<IResponsePage<TSource>>} responsePromise - Промис, возвращающий исходный объект постраничного ответа
   * @param {(payload: TSource) => TDest} onTransform - Функция преобразования элементов массива
   * @returns {Promise<IResponsePage<TDest>>} Промис, который разрешается в новый объект постраничного ответа с преобразованными элементами
   * @description Ожидает разрешения промиса с постраничным ответом, затем применяет преобразование к каждому элементу массива
   */
  public static async transformPageAsync<TSource, TDest>(
    responsePromise: Promise<IResponsePage<TSource>>,
    onTransform: (payload: TSource) => TDest
  ): Promise<IResponsePage<TDest>> 
  {
    const response = await responsePromise;
    return ResponseHelper.transformPage(response, onTransform);
  }

  /**
   * Создает объект ответа на основе объекта ошибки
   * @template TPayload - Тип полезной нагрузки в возвращаемом ответе
   * @param {unknown} error - Объект ошибки, который должен реализовывать интерфейс IResult
   * @param {TPayload} [payload] - Опциональная полезная нагрузка для ответа
   * @returns {IResponse<TPayload>} Объект ответа, содержащий информацию об ошибке в поле result
   * @description Используется для создания структурированного ответа при обработке ошибок,
   * предполагая, что объект ошибки соответствует интерфейсу IResult
   */
  public static responseFromErrorResult<TPayload>(error: unknown, payload?: TPayload): IResponse<TPayload> 
  {
    const result = error as IResult;
    const response: IResponse<TPayload> = {
      result: result,
      payload: payload
    };

    return response;
  }

  /**
   * Создает объект постраничного ответа на основе объекта ошибки
   * @template TPayload - Тип элементов массива полезной нагрузки в возвращаемом ответе
   * @param {unknown} error - Объект ошибки, который должен реализовывать интерфейс IResult
   * @param {TPayload[]} [payload] - Опциональный массив полезной нагрузки для ответа
   * @returns {IResponsePage<TPayload>} Объект постраничного ответа, содержащий информацию об ошибке в поле result
   * @description Аналогичен responseFromErrorResult, но для постраничных ответов.
   * Создает структурированный постраничный ответ при обработке ошибок
   */
  public static responsePageFromErrorResult<TPayload>(error: unknown, payload?: TPayload[]): IResponsePage<TPayload> 
  {
    const result = error as IResult;
    const response: IResponsePage<TPayload> = {
      result: result,
      payload: payload
    };

    return response;
  }

  /**
   * Преобразует результат постраничной выборки в структуру с информацией о пагинации.
   *
   * @template TItem - Тип элементов массива
   * @param {TItem[]} pageData - Массив данных текущей страницы (результат slicePage)
   * @param {IPageInfoRequest} pageInfo - Параметры пагинации запроса
   * @param {number} totalCount - Общее количество элементов в исходном наборе данных
   * @returns {IPageInfoResponse} Структура с полной информацией о пагинации
   *
   * @example
   * const persons = Persons; // Ваш массив из 46 элементов
   * const pageInfoRequest = { pageNumber: 2, pageSize: 10 };
   * const pageData = ArrayHelper.slicePage(persons, pageInfoRequest.pageNumber, pageInfoRequest.pageSize);
   *
   * const pageInfoResponse = buildPageInfoResponse(
   *   pageData,
   *   pageInfoRequest,
   *   persons.length
   * );
   *
   * // Результат:
   * // {
   * //   pageNumber: 2,
   * //   pageSize: 10,
   * //   currentPageSize: 10,
   * //   totalCount: 46
   * // }
   */
  public static buildPageInfo<TItem>(pageData: TItem[], pageInfo: IPageInfoRequest, totalCount: number): IPageInfoResponse 
  {
    // Валидация входных данных
    if (pageInfo.pageNumber < 0) 
    {
      throw new Error('Page number cannot be negative');
    }

    if (pageInfo.pageSize <= 0) 
    {
      throw new Error('Page size must be greater than 0');
    }

    if (totalCount < 0) 
    {
      throw new Error('Total count cannot be negative');
    }

    return {
      pageNumber: pageInfo.pageNumber,
      pageSize: pageInfo.pageSize,
      currentPageSize: pageData.length,
      totalCount: totalCount
    };
  }
}
