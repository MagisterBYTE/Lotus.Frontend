/**
 * Утилита для проверки типа сетевой ошибки
 */
export abstract class NetworkErrorUtils 
{
  /** 
   * Проверяет, является ли ошибка проблемой соединения
   */
  public static isNetworkError(error: unknown): boolean 
  {
    return error instanceof TypeError && error.message === 'Failed to fetch';
  }

  /** 
   * Проверяет, вызвана ли ошибка таймаутом
   */
  public static isTimeoutError(error: Error): boolean 
  {
    return error.name === 'AbortError' || error.name === 'TimeoutError';
  }
}