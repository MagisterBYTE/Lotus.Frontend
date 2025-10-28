/**
 * Тип для извлечения параметров из пути
 */
export type ExtractRouteParams<TPath extends string> = TPath extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<Rest>
  : TPath extends `${string}:${infer Param}`
  ? Param
  : string;

/**
 * Тип для параметров с литеральными значениями
 */
export type RouteParamConstraints<TParam extends string> = Partial<Record<ExtractRouteParams<TParam>, readonly string[]>>;

/**
 * Тип для значений параметров на основе ограничений
 */
export type ParamValues<T extends string, C extends RouteParamConstraints<T>> = {
  [K in ExtractRouteParams<T>]: C[K] extends readonly string[]
  ? C[K][number] // Только значения из литерального типа
  : string; // Любая строка, если ограничений нет
};

/**
 * Интерфейс для определения маршрута в приложении
 */
export interface IRoute
{
  /**
   * Маршрут
   */
  readonly path: string;

  /**
   * Должен ли он быть пользователь авторизован для перехода по данному маршруту
   */
  readonly isShouldBeAuthorized: boolean;

  /**
   * Набор разрешений для перехода по данному маршруту
   */
  readonly permissions?: string[];

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
  build(params?: Record<string, string>): string;

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
  withQuery(query?: Record<string, string>): string;

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
  withParamsAndQuery(params?: Record<string, string>, query?: Record<string, string>): string;
}