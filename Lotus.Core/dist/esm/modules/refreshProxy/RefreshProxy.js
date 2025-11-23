import { FunctionHelper } from '#helpers';
/**
 * Базовый класс реализующий обновления прокси объекта
 */
export class RefreshProxy {
    onRefreshProxy;
    constructor() {
        this.onRefreshProxy = this.defaultRefreshProxy;
        FunctionHelper.bindAllMethods(this);
    }
    /**
     * Метод по умолчанию для обновления прокси объекта.
     * Служит как заглушка
     */
    defaultRefreshProxy() {
    }
}
//# sourceMappingURL=RefreshProxy.js.map