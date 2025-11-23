import { IRoute } from './types';
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
//# sourceMappingURL=Route.d.ts.map