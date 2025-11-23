import { IRoute } from './types';

/**
 * Класс для определения маршрута в приложении
 */
export class Route implements IRoute
{
  // #region Fields
  readonly path: string;
  readonly isShouldBeAuthorized: boolean;
  readonly permissions?: string[];
  // #endregion

  /**
   * @param path Путь маршрута
   * @param isShouldBeAuthorized Требует ли маршрут аутентификации
   * @param permissions Набор разрешений для перехода по данному маршруту
   */
  constructor(path: string, isShouldBeAuthorized?: boolean, permissions?: string[])
  {
    this.path = path;
    this.isShouldBeAuthorized = Boolean(isShouldBeAuthorized);
    this.permissions = permissions;
  }

  // #region Methods
  /**
   * Заменяет path-параметры в маршруте реальными значениями
   * @param params - Объект с параметрами { paramName: value }
   * @returns Строка пути с подставленными параметрами
   *
   * @example
   * const route = new Route('/user/:userId/profile/:tab');
   * route.build({ userId: '123', tab: 'settings' });
   * // Возвращает: '/user/123/profile/settings'
   */
  public build(params: Record<string, string> = {}): string
  {
    let result = this.path;

    // Заменяем каждый параметр в пути
    Object.entries(params).forEach(([key, value]) =>
    {
      const paramPlaceholder = `:${key}`;

      // Проверяем, что параметр существует в пути
      if (result.includes(paramPlaceholder))
      {
        result = result.replace(paramPlaceholder, encodeURIComponent(value));
      }
      else
      {
        console.warn(`Параметр "${key}" не найден в пути: ${this.path}`);
      }
    });

    // Проверяем, остались ли не замененные параметры
    const remainingParams = result.match(/:\w+/g);
    if (remainingParams)
    {
      console.warn(`Не все параметры заменены. Остались: ${remainingParams.join(', ')}`);
    }

    return result;
  }

  /**
   * Добавляет query-параметры к маршруту
   * @param query - Объект с query-параметрами { key: value }
   * @returns Строка пути с query-параметрами
   *
   * @example
   * const route = new Route('/search');
   * route.withQuery({ q: 'react', sort: 'date' });
   * // Возвращает: '/search?q=react&sort=date'
   */
  withQuery(query: Record<string, string> = {}): string
  {
    if (Object.keys(query).length === 0)
    {
      return this.path;
    }

    const searchParams = new URLSearchParams();

    // Добавляем каждый query-параметр
    Object.entries(query).forEach(([key, value]) =>
    {
      if (value !== undefined && value !== null && value !== '')
      {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${this.path}?${queryString}` : this.path;
  }

  /**
   * Комбинированный метод: заменяет path-параметры и добавляет query-параметры
   * @param params - Path-параметры
   * @param query - Query-параметры
   * @returns Полный URL с параметрами
   *
   * @example
   * const route = new Route('/user/:userId/profile');
   * route.withParamsAndQuery(
   *   { userId: '123' },
   *   { tab: 'settings', modal: 'true' }
   * );
   * // Возвращает: '/user/123/profile?tab=settings&modal=true'
   */
  withParamsAndQuery(params: Record<string, string> = {}, query: Record<string, string> = {}): string
  {
    const pathWithParams = this.build(params);
    const routeWithParams = new Route(pathWithParams, this.isShouldBeAuthorized, this.permissions);
    return routeWithParams.withQuery(query);
  }

  /**
   * Преобразование в строку (для удобства)
   */
  toString(): string
  {
    return this.path;
  }
  // #endregion
}
