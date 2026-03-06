import { INotifyPropertyChanged } from '#types';
import { PropertyChangedFunction } from 'src/types/NotifyPropertyChanged';
/**
 * Базовый класс реализующий уведомление об изменение своих свойств
 */
export declare class ReactiveObject implements INotifyPropertyChanged {
    protected _handlers: Set<PropertyChangedFunction>;
    constructor();
    /**
     * Уведомление всех подписчиков об изменение указанного свойства
     * @param propertyName Имя изменившегося свойства
     */
    notifyPropertyChanged(propertyName?: string): void;
    /**
     * Метод для добавления наблюдателя за объектом
     * @param handler Функция-обработчик события изменения свойства
     */
    addPropertyChanged(handler: PropertyChangedFunction): void;
    /**
     * Метод для удаления наблюдателя за объектом
     * @param handler Функция-обработчик события изменения свойства
     */
    removePropertyChanged(handler: PropertyChangedFunction): void;
}
//# sourceMappingURL=ReactiveObject.d.ts.map