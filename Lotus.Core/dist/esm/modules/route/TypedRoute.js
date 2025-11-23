/**
 * Класс для определения маршрута в приложении
 */
export class TypedRoute {
    // #region Static
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    static create(path, isShouldBeAuthorized, permissions) {
        return new TypedRoute(path, isShouldBeAuthorized, undefined, permissions);
    }
    static createWithConstraints(path, constraints, isShouldBeAuthorized, permissions) {
        return new TypedRoute(path, isShouldBeAuthorized, constraints, permissions);
    }
    // #endregion
    // #region Fields
    path;
    isShouldBeAuthorized;
    permissions;
    constraints;
    // #endregion
    /**
     * @param path Путь маршрута
     * @param isShouldBeAuthorized Требует ли маршрут аутентификации
     * @param constraints - Ограничения значений для параметров
     * @param permissions Набор разрешений для перехода по данному маршруту
     */
    constructor(path, isShouldBeAuthorized, constraints, permissions) {
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
    build(params) {
        this.validateParams(params);
        let result = this.path;
        Object.entries(params).forEach(([key, value]) => {
            const paramPlaceholder = `:${key}`;
            if (result.includes(paramPlaceholder)) {
                result = result.replace(paramPlaceholder, encodeURIComponent(value));
            }
            else {
                console.warn(`Параметр "${key}" не найден в пути: ${this.path}`);
            }
        });
        // Проверяем остались ли не замененные обязательные параметры
        const remainingParams = this.getMissingParams(result);
        if (remainingParams.length > 0) {
            console.warn(`Не все параметры заменены. Остались: ${remainingParams.join(', ')}`);
        }
        return result;
    }
    /**
     * Валидация параметров против ограничений
     */
    validateParams(params) {
        if (!this.constraints)
            return;
        Object.entries(params).forEach(([key, value]) => {
            const allowedValues = this.constraints?.[key];
            if (allowedValues && !allowedValues.includes(value)) {
                console.error(`Недопустимое значение "${value}" для параметра "${key}". ` + `Допустимые значения: ${allowedValues.join(', ')}`);
                // В development можно выбросить ошибку
                if (process.env.NODE_ENV === 'development') {
                    throw new Error(`Invalid parameter value for ${key}`);
                }
            }
        });
    }
    /**
     * Получает список отсутствующих параметров
     */
    getMissingParams(currentPath) {
        const paramMatches = currentPath.match(/:\w+/g);
        return paramMatches ? paramMatches.map((param) => param.slice(1)) : [];
    }
    /**
     * Добавляет query-параметры
     */
    withQuery(query = {}) {
        if (Object.keys(query).length === 0) {
            return this.path;
        }
        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value);
            }
        });
        const queryString = searchParams.toString();
        return queryString ? `${this.path}?${queryString}` : this.path;
    }
    /**
     * Комбинированный метод с типизированными параметрами
     */
    withParamsAndQuery(params, query = {}) {
        const pathWithParams = this.build(params);
        return pathWithParams + (Object.keys(query).length > 0 ? `?${new URLSearchParams(query)}` : '');
    }
    toString() {
        return this.path;
    }
    /**
     * Получает допустимые значения для параметра (для использования в UI)
     */
    getAllowedValues(paramName) {
        return this.constraints?.[paramName];
    }
    /**
     * Проверяет, является ли значение допустимым для параметра
     */
    isValidValue(paramName, value) {
        const allowedValues = this.getAllowedValues(paramName);
        return !allowedValues || allowedValues.includes(value);
    }
}
//# sourceMappingURL=TypedRoute.js.map