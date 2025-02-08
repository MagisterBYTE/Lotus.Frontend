/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Базовый класс для сервисов Api
 */
export abstract class ApiService
{
  constructor() 
  {

  }

  protected get<TResponse = any>(path: string, config?: any) 
  {

  }

  protected post<TResponse = any, TRequest = any>(path: string, payload: TRequest, config?: any)
  {

  }


  protected put<TResponse = any, TRequest = any>(path: string, payload: TRequest, config?: any) 
  {
  }


  protected delete<TResponse = any>(path: string, config?: any) 
  {
  }

  protected getConfigAcceptJson():RequestInit
  {
    const config: RequestInit = {
      headers:
      {
        'Accept': 'application/json'
      }
    }

    return config;
  }
}