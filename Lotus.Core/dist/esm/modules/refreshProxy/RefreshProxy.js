import { FunctionHelper } from '#helpers';
/**
 * Базовый класс реализующий обновления прокси объекта
 */
export class RefreshProxy {
    onRefreshProxy;
    constructor() {
        this.onRefreshProxy = () => { };
        FunctionHelper.bindAllMethods(this);
    }
}
//# sourceMappingURL=RefreshProxy.js.map