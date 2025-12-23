/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ObjectHelper } from '#helpers';
import { LocalizationCore } from '#localization';
import { castToResult, IResult } from '#types';
import { Assert } from '#utils';

/**
 * Базовый класс для сервисов Api
 */
export abstract class ApiService
{
  protected api: AxiosInstance;

  constructor(baseURL: string)
  {
    const api = axios.create({
      baseURL: baseURL
    });

    // Используем стрелочные функции для сохранения контекста
    api.interceptors.request.use(
      (config) => this.handleRequest(config),
      (error) => this.handleRequestError(error)
    );

    api.interceptors.response.use(
      (response) => this.handleResponse(response),
      (error) => this.handleResponseError(error)
    );

    this.api = api;
  }


  protected handleRequest(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>
  {
    config.timeout = 10 * 60 * 1000;
    return config;
  }

  protected handleRequestError(error: AxiosError): Promise<AxiosError>
  {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  }

  protected handleResponse(response: AxiosResponse)
  {
    return response;
  }

  protected handleResponseError(error: AxiosError)
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
        console.log(error.response.data);
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
        const errorAuthResponse = error.response.data as any;
        if (errorAuthResponse && typeof errorAuthResponse === 'object' && 'error' in errorAuthResponse && 'error_description' in errorAuthResponse)
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

        console.log(error);
        console.log('Error is not result!!!');
        return Promise.reject(error);
      }
      else
      {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log(error);
        console.log('Error is not result!!!');
        return Promise.reject(String(error));
      }
    }
  }


  protected get<TResponse = any>(path: string, config?: any)
  {
    return this.api.get<TResponse>(path, config);
  }


  protected post<TResponse = any, TRequest = any>(path: string, payload: TRequest)
  {
    return this.api.post<TResponse>(path, payload);
  }


  protected put<TResponse = any, TRequest = any>(path: string, payload: TRequest)
  {
    return this.api.put<TResponse>(path, payload);
  }


  protected delete<TResponse = any>(path: string, config?: any)
  {
    return this.api.delete<TResponse>(path, config);
  }

  protected getConfigAcceptJson()
  {
    const config: AxiosRequestConfig = {
      headers: {
        Accept: 'application/json'
      }
    };

    return config;
  }
}
