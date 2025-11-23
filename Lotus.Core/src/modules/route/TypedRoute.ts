import { ExtractRouteParams, IRoute, ParamValues, RouteParamConstraints } from './types';

/**
 * Класс для определения маршрута в приложении
 */
export class TypedRoute<TPath extends string = string, TConstraints extends RouteParamConstraints<TPath> = RouteParamConstraints<TPath>> implements IRoute
{
  // #region Static
  /**
   * @param path Путь маршрута
   * @param isShouldBeAuthorized Требует ли маршрут аутентификации
   * @param permissions Набор разрешений для перехода по данному маршруту
   */
  public static create<TPath extends string>(path: TPath, isShouldBeAuthorized?: boolean, permissions?: string[])
  {
    return new TypedRoute<TPath, object>(path, isShouldBeAuthorized, undefined, permissions);
  }

  public static createWithConstraints<TPath extends string, TConstraints extends RouteParamConstraints<TPath>>(path: TPath, constraints: TConstraints, 
    isShouldBeAuthorized?: boolean, permissions?: string[]): TypedRoute<TPath, TConstraints>
  {
    return new TypedRoute(path, isShouldBeAuthorized, constraints, permissions);
  }
  // #endregion

  // #region Fields
  readonly path: string;
  readonly isShouldBeAuthorized: boolean;
  readonly permissions?: string[];
  readonly constraints?: TConstraints;
  // #endregion

  /**
   * @param path Путь маршрута
   * @param isShouldBeAuthorized Требует ли маршрут аутентификации
   * @param constraints - Ограничения значений для параметров
   * @param permissions Набор разрешений для перехода по данному маршруту
   */
  public constructor(path: string, isShouldBeAuthorized?: boolean, constraints?: TConstraints, permissions?: string[])
  {
    this.path = path;
    this.isShouldBeAuthorized = Boolean(isShouldBeAuthorized);
    this.constraints = constraints;
    this.permissions = permissions;
  }

  // #region Methods
  /**
   * Строит путь с типизированными параметрами
   * @param params - Параметры, соответствующие ограничениям
   * @returns Путь с подставленными параметрами
   *
   * @example
   * const route = new TypedRoute('/user/:userId/tab/:tabName', true, {
   *   tabName: ['settings', 'security', 'notifications'] as const
   * });
   *
   * route.build({ userId: '123', tabName: 'settings' }); // ✅ OK
   * route.build({ userId: '123', tabName: 'invalid' }); // ❌ TypeScript ошибка
   */
  public build(params: {
    [K in ExtractRouteParams<TPath>]: K extends keyof TConstraints
    ? TConstraints[K] extends readonly string[]
    ? TConstraints[K][number] // Используем значения из constraints
    : string
    : string; // Если нет constraint - любая строка
  }): string
  {
    this.validateParams(params);

    let result = this.path;

    Object.entries(params).forEach(([key, value]) =>
    {
      const paramPlaceholder = `:${key}`;

      if (result.includes(paramPlaceholder))
      {
        result = result.replace(paramPlaceholder, encodeURIComponent(value as string));
      }
      else
      {
        console.warn(`Параметр "${key}" не найден в пути: ${this.path}`);
      }
    });

    // Проверяем остались ли не замененные обязательные параметры
    const remainingParams = this.getMissingParams(result);
    if (remainingParams.length > 0)
    {
      console.warn(`Не все параметры заменены. Остались: ${remainingParams.join(', ')}`);
    }

    return result;
  }

  /**
   * Валидация параметров против ограничений
   */
  private validateParams<P extends ParamValues<TPath, RouteParamConstraints<TPath>>>(params: P): void
  {
    if (!this.constraints) return;

    Object.entries(params).forEach(([key, value]) =>
    {
      const allowedValues = this.constraints?.[key as keyof RouteParamConstraints<TPath>];

      if (allowedValues && !allowedValues.includes(value as string))
      {
        console.error(`Недопустимое значение "${value}" для параметра "${key}". ` + `Допустимые значения: ${allowedValues.join(', ')}`);
        // В development можно выбросить ошибку
        if (process.env.NODE_ENV === 'development')
        {
          throw new Error(`Invalid parameter value for ${key}`);
        }
      }
    });
  }

  /**
   * Получает список отсутствующих параметров
   */
  private getMissingParams(currentPath: string): string[]
  {
    const paramMatches = currentPath.match(/:\w+/g);
    return paramMatches ? paramMatches.map((param) => param.slice(1)) : [];
  }

  /**
   * Добавляет query-параметры
   */
  public withQuery(query: Record<string, string> = {}): string
  {
    if (Object.keys(query).length === 0)
    {
      return this.path;
    }

    const searchParams = new URLSearchParams();
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
   * Комбинированный метод с типизированными параметрами
   */
  public withParamsAndQuery(
    params: {
      [K in ExtractRouteParams<TPath>]: K extends keyof TConstraints
      ? TConstraints[K] extends readonly string[]
      ? TConstraints[K][number] // Используем значения из constraints
      : string
      : string; // Если нет constraint - любая строка
    },
    query: Record<string, string> = {}
  ): string
  {
    const pathWithParams = this.build(params);
    return pathWithParams + (Object.keys(query).length > 0 ? `?${new URLSearchParams(query)}` : '');
  }

  public toString(): string
  {
    return this.path;
  }

  /**
   * Получает допустимые значения для параметра (для использования в UI)
   */
  public getAllowedValues<K extends ExtractRouteParams<TPath>>(paramName: K): readonly string[] | undefined
  {
    return this.constraints?.[paramName];
  }

  /**
   * Проверяет, является ли значение допустимым для параметра
   */
  public isValidValue<K extends ExtractRouteParams<TPath>>(paramName: K, value: string): boolean
  {
    const allowedValues = this.getAllowedValues(paramName);
    return !allowedValues || allowedValues.includes(value);
  }
  // #endregion
}
