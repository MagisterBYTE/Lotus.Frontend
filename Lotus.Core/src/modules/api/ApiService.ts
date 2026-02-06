import { BrowserHelper, FunctionHelper, ObjectHelper } from '#helpers';
import { LocalizationCore } from '#localization';
import { castToResult, IResult } from '#types';
import { Assert } from '#utils';
import { ApiRequestConfig, IApiRequestConfig } from './ApiRequestConfig';
import { ApiRequestError } from './ApiRequestError';
import { ContentTypeConstants } from './ContentTypeConstants';
import { HeaderNamesConstants } from './HeaderNamesConstants';
import { NetworkErrorUtils } from './NetworkErrorUtils';

/**
 * Класс для работы с API
 */
export class ApiService
{
  // #region Static methods
  /**
   * Генерирует полный URL с учетом параметров запроса
   * @param baseUrl - Базовый адрес (напр. 'https://api.com')
   * @param params - Объект URLSearchParams с параметрами
   * @returns Строка полного URL
   */
  public static buildFullUrl(baseUrl: string, params: URLSearchParams): string
  {
    const url = new URL(baseUrl);

    params.forEach((value: string, key: string) =>
    {
      url.searchParams.append(key, value);
    });

    return url.href; // .href возвращает полную строку URL
  }
  // #endregion

  // #region Fields
  private _baseUrl: string;
  // endregion

  // #region Properties
  public get baseUrl(): string
  {
    return this._baseUrl;
  }
  // #endregion

  /**
   * Конструктор
   * @param baseUrl - Базовый URL API (опционально)
   */
  constructor(baseUrl: string = '')
  {
    this._baseUrl = baseUrl;
    FunctionHelper.bindAllMethods(this);
  }

  // #region Private methods
  /**
   * Создает полный URL для запроса
   */
  protected createFullUrl(path: string): string
  {
    if (BrowserHelper.isAbsoluteUrl(path)) return path;
    if (!path.startsWith('/') && this._baseUrl && !this._baseUrl.endsWith('/'))
    {
      return `${this._baseUrl}/${path}`;
    }
    return `${this._baseUrl}${path}`;
  }

  /**
   * Выполняет HTTP-запрос с обработкой ошибок
   */
  protected async request<TResponse = unknown>(url: string, config: ApiRequestConfig): Promise<TResponse>
  {
    try
    {
      const actualConfig = await this.handleRequest(url, config);

      const response = await fetch(url, {
        ...actualConfig,
        signal: actualConfig.abortSignal
      });

      if (!response.ok)
      {
        // Клонируем поток, так как методы .json() и .text() читают его один раз
        const data = await response.clone().json().catch(() => response.text());
        const error: ApiRequestError = new ApiRequestError(`HTTP error ${response.status}`, {
          status: response.status,
          statusText: response.statusText,
          data: data,
          url: response.url
        });

        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json'))
      {
        const dataJson = await response.json();
        return dataJson as TResponse;
      }
      else
      {
        const dataText = await response.text();
        return dataText as TResponse;
      }
    }
    catch (error)
    {
      const errorResult = await this.handleResponseError(url, error as ApiRequestError);
      throw errorResult;
    }
  }

  /**
   * Обработка конфигурации запроса
   * @param config
   * @returns
   */
  protected handleRequest(fullUri: string, config: ApiRequestConfig): Promise<ApiRequestConfig>
  {
    return Promise.resolve(config);
  }

  /**
   * Обработка ошибок ответа
   */
  // eslint-disable-next-line complexity
  protected handleResponseError(uri: string, error: ApiRequestError): Promise<never>
  {
    // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
    if (error.response)
    {
      // Все ошибки приводим к типу IResult для унификации обработки и реагирования
      const result: IResult | undefined = castToResult(error.response.data as object);
      if (result)
      {
        // Дополнительная проверка на value
        const value = ObjectHelper.getValue(error.response.data, 'value', undefined);
        if (value !== undefined)
        {
          result.data = value;
        }
        return Promise.reject(result);
      }
      else
      {
        // Проверяем типовые ошибки
        // 404
        if (error.response.status === 404)
        {
          const uri = (error.request as XMLHttpRequest).responseURL ?? '';
          const message = LocalizationCore.data.api.errorNotFound.replace('{0}', uri);
          const resultNotFound: IResult = {
            succeeded: false,
            code: 404,
            message: message
          };
          return Promise.reject(resultNotFound);
        }

        // 401
        if (error.response.status === 401)
        {
          const message = LocalizationCore.data.api.errorAuth;
          const resultNotAuth: IResult = {
            succeeded: false,
            code: 401,
            message: message
          };
          return Promise.reject(resultNotAuth);
        }

        // Ошибка аутентификации по стандарту RFC 6749
        const errorAuthResponse = error.response.data;
        if (
          errorAuthResponse &&
          typeof errorAuthResponse === 'object' &&
          errorAuthResponse !== null &&
          errorAuthResponse !== undefined &&
          'error' in errorAuthResponse &&
          typeof errorAuthResponse.error === 'string' &&
          'error_description' in errorAuthResponse &&
          typeof errorAuthResponse.error_description === 'string'
        )
        {
          const errorAuth = errorAuthResponse.error;
          const errorDescAuth = errorAuthResponse.error_description;
          if (Assert.existValue<string>(errorDescAuth))
          {
            const resultAuth: IResult = {
              succeeded: false,
              code: Number(error.response.status ?? 500),
              message: errorDescAuth
            };
            return Promise.reject(resultAuth);
          }

          const message = ObjectHelper.getValue(LocalizationCore.data.api.auth, errorAuth, undefined);
          if (Assert.existValue<string>(message))
          {
            const resultAuth: IResult = {
              succeeded: false,
              code: Number(error.response.status ?? 500),
              message: message
            };
            return Promise.reject(resultAuth);
          }
        }

        const resultError: IResult = {
          data: error.response.data, // Сохраняем данные оригинальной ошибки
          succeeded: false,
          code: Number(error.response.status ?? 500),
          message: error.message
        };
        return Promise.reject(resultError);
      }
    }
    else
    {
      // Запрос был сделан, но ответ не получен - `error.request`- это экземпляр XMLHttpRequest в браузере
      if (error.request)
      {
        // Проверка на отдельные коды ошибок
        if (error.code === 'ERR_NETWORK')
        {
          const result: IResult = { succeeded: false, code: 500, message: LocalizationCore.data.api.errorNotOnline };
          return Promise.reject(result);
        }
        return Promise.reject(error);
      }
      else
      {
        if (NetworkErrorUtils.isTimeoutError(error))
        {
          const result: IResult = { succeeded: false, code: 500, message: LocalizationCore.data.api.errorTimeoutError };
          return Promise.reject(result);
        }

        if (NetworkErrorUtils.isNetworkError(error))
        {
          if (!navigator.onLine)
          {
            const result: IResult = { succeeded: false, code: 500, message: LocalizationCore.data.api.errorNotOnline };
            return Promise.reject(result);
          }
          {
            const message = LocalizationCore.data.api.errorNotFound.replace('{0}', uri);
            const resultNotFound: IResult = {
              succeeded: false,
              code: 500,
              message: message
            };
            return Promise.reject(resultNotFound);
          }
        }

        // Произошло что-то при настройке запроса, вызвавшее ошибку
        return Promise.reject({
          succeeded: false,
          code: 500,
          message: error.message ?? 'Unknown error occurred'
        });
      }
    }
  }
  // #endregion

  // #region Public methods
  /**
   * GET запрос
   */
  public get<TResponse>(path: string, searchParams?: URLSearchParams, config?: IApiRequestConfig): Promise<TResponse>
  {
    let url = this.createFullUrl(path);
    const actualConfig = new ApiRequestConfig(config);

    if (searchParams)
    {
      url = ApiService.buildFullUrl(url, searchParams);
    }

    if (actualConfig.hasHeader(HeaderNamesConstants.ContentType) === false)
    {
      actualConfig.addHeader(HeaderNamesConstants.ContentType, ContentTypeConstants.ApplicationJson);
    }

    return this.request<TResponse>(url, actualConfig.asGet());
  }

  /**
   * POST запрос
   */
  public post<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest, config?: ApiRequestConfig): Promise<TResponse>
  {
    const url = this.createFullUrl(path);
    const actualConfig = new ApiRequestConfig(config);
    actualConfig.setJsonBody(payload);

    return this.request<TResponse>(url, actualConfig.asPost());
  }

  /**
   * PUT запрос
   */
  public put<TResponse = unknown, TRequest = unknown>(path: string, payload: TRequest, config?: ApiRequestConfig): Promise<TResponse>
  {
    const url = this.createFullUrl(path);

    const actualConfig = new ApiRequestConfig(config);
    actualConfig.setJsonBody(payload);

    return this.request<TResponse>(url, actualConfig.asPut());
  }

  /**
   * DELETE запрос
   */
  public delete<TResponse = unknown>(path: string, searchParams?: URLSearchParams, config?: ApiRequestConfig): Promise<TResponse>
  {
    let url = this.createFullUrl(path);

    if (searchParams)
    {
      url = ApiService.buildFullUrl(url, searchParams);
    }

    const actualConfig = new ApiRequestConfig(config);
    if (actualConfig.hasHeader(HeaderNamesConstants.ContentType) === false)
    {
      actualConfig.addHeader(HeaderNamesConstants.ContentType, ContentTypeConstants.ApplicationJson);
    }

    return this.request<TResponse>(url, actualConfig.asDelete());
  }
  // #endregion
}
