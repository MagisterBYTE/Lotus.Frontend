/**
 * Интерфейс для определения маршрута в приложении
 */
export interface IRoute {
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
/**
 * Тип для извлечения параметров из пути
 */
type ExtractRouteParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}` ? Param | ExtractRouteParams<Rest> : T extends `${string}:${infer Param}` ? Param : string;
/**
 * Тип для параметров с литеральными значениями
 */
export type RouteParamConstraints<T extends string> = Partial<Record<ExtractRouteParams<T>, readonly string[]>>;
/**
 * Тип для значений параметров на основе ограничений
 */
export type ParamValues<T extends string, C extends RouteParamConstraints<T>> = {
    [K in ExtractRouteParams<T>]: C[K] extends readonly string[] ? C[K][number] : string;
};
/**
 * Класс для определения маршрута в приложении
 */
export declare class Route implements IRoute {
    readonly path: string;
    readonly isShouldBeAuthorized: boolean;
    readonly permissions?: string[];
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    constructor(path: string, isShouldBeAuthorized?: boolean, permissions?: string[]);
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
    /**
     * Преобразование в строку (для удобства)
     */
    toString(): string;
}
export declare class TypedRoute<TPath extends string> implements IRoute {
    readonly path: string;
    readonly isShouldBeAuthorized: boolean;
    readonly permissions?: string[];
    readonly constraints?: RouteParamConstraints<TPath>;
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param constraints - Ограничения значений для параметров
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    constructor(path: string, isShouldBeAuthorized?: boolean, constraints?: RouteParamConstraints<TPath>, permissions?: string[]);
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
    build<TParams extends ParamValues<TPath, RouteParamConstraints<TPath>>>(params: TParams): string;
    /**
     * Валидация параметров против ограничений
     */
    private validateParams;
    /**
     * Получает список отсутствующих параметров
     */
    private getMissingParams;
    /**
     * Добавляет query-параметры
     */
    withQuery(query?: Record<string, string>): string;
    /**
     * Комбинированный метод с типизированными параметрами
     */
    withParamsAndQuery<P extends ParamValues<TPath, RouteParamConstraints<TPath>>>(params: P, query?: Record<string, string>): string;
    toString(): string;
    /**
     * Получает допустимые значения для параметра (для использования в UI)
     */
    getAllowedValues<K extends ExtractRouteParams<TPath>>(paramName: K): readonly string[] | undefined;
    /**
     * Проверяет, является ли значение допустимым для параметра
     */
    isValidValue<K extends ExtractRouteParams<TPath>>(paramName: K, value: string): boolean;
}
export {};
//# sourceMappingURL=Route.d.ts.map