/**
 * Класс для определения маршрута в приложении
 */
export class Route {
    /**
     * Маршрут
     */
    path;
    /**
     * Должен ли он быть пользователь авторизован для перехода по данному маршруту
     */
    isShouldBeAuthorized;
    /**
     * Набор разрешений для перехода по данному маршруту
     */
    permissions;
    constructor(path, isShouldBeAuthorized, permissions) {
        this.path = path;
        this.isShouldBeAuthorized = isShouldBeAuthorized;
        this.permissions = permissions;
    }
}
//# sourceMappingURL=Route.js.map