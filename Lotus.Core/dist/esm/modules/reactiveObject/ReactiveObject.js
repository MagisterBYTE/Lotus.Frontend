import { FunctionHelper } from '#helpers';
/**
 * Базовый класс реализующий уведомление об изменение своих свойств
 */
export class ReactiveObject {
    // #region Fields
    _handlers = new Set();
    // #endregion
    constructor() {
        FunctionHelper.bindAllMethods(this);
    }
    /**
     * Уведомление всех подписчиков об изменение указанного свойства
     * @param propertyName Имя изменившегося свойства
     */
    notifyPropertyChanged(propertyName) {
        this._handlers.forEach(handler => handler(propertyName, this));
    }
    // #region INotifyPropertyChanged
    /**
     * Метод для добавления наблюдателя за объектом
     * @param handler Функция-обработчик события изменения свойства
     */
    addPropertyChanged(handler) {
        this._handlers.add(handler);
    }
    /**
     * Метод для удаления наблюдателя за объектом
     * @param handler Функция-обработчик события изменения свойства
     */
    removePropertyChanged(handler) {
        this._handlers.add(handler);
    }
}
//# sourceMappingURL=ReactiveObject.js.map