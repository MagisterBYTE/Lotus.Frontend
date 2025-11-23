import { ExtractRouteParams, IRoute, RouteParamConstraints } from './types';
/**
 * Класс для определения маршрута в приложении
 */
export declare class TypedRoute<TPath extends string = string, TConstraints extends RouteParamConstraints<TPath> = RouteParamConstraints<TPath>> implements IRoute {
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    static create<TPath extends string>(path: TPath, isShouldBeAuthorized?: boolean, permissions?: string[]): TypedRoute<TPath, object>;
    static createWithConstraints<TPath extends string, TConstraints extends RouteParamConstraints<TPath>>(path: TPath, constraints: TConstraints, isShouldBeAuthorized?: boolean, permissions?: string[]): TypedRoute<TPath, TConstraints>;
    readonly path: string;
    readonly isShouldBeAuthorized: boolean;
    readonly permissions?: string[];
    readonly constraints?: TConstraints;
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param constraints - Ограничения значений для параметров
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    constructor(path: string, isShouldBeAuthorized?: boolean, constraints?: TConstraints, permissions?: string[]);
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
    build(params: {
        [K in ExtractRouteParams<TPath>]: K extends keyof TConstraints ? TConstraints[K] extends readonly string[] ? TConstraints[K][number] : string : string;
    }): string;
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
    withParamsAndQuery(params: {
        [K in ExtractRouteParams<TPath>]: K extends keyof TConstraints ? TConstraints[K] extends readonly string[] ? TConstraints[K][number] : string : string;
    }, query?: Record<string, string>): string;
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
//# sourceMappingURL=TypedRoute.d.ts.map