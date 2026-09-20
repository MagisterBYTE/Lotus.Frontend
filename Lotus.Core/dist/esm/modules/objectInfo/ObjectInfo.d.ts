import { IFilterFunctionDesc } from '#modules/filter';
import { IPropertyDescriptor } from './PropertyDescriptor';
/**
 * Определение функции для рисования всего объект
 */
export type RenderObjectFunction = (item?: unknown, context?: unknown, index?: number) => unknown;
/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo {
    /**
     * Название типа объекта
     */
    objectName: string;
    /**
     * Получение списка свойств
     */
    getProperties(): IPropertyDescriptor[];
    /**
     * Получение списка свойств поддерживающих сортировку
     */
    getPropertiesSorted(): IPropertyDescriptor[];
    /**
     * Получение свойства по имени
     * @param name Имя свойства
     */
    getPropertyByName(name: string): IPropertyDescriptor;
    /**
     * Получение списка функций фильтрации для свойств
     */
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
    /**
     * Функция для отрисовки всего объекта
     */
    renderObject?: RenderObjectFunction;
}
/**
 * Интерфейс для получение информации о объекте
 */
export interface IObjectInfoInspectable {
    /**
     * Получение информации о объекте
     * @returns Информация о объекте
     */
    getObjectInfo(): IObjectInfo;
}
/**
 * Класс для представления(описания) свойств объектов
 */
export declare class ObjectInfo implements IObjectInfo {
    /**
     * Конвертация значения по указанному свойству
     * @param propertyInfo Информация о свойстве
     * @param value Исходное значение
     * @returns Целевое значение
     */
    static convertedValue(propertyInfo: IPropertyDescriptor, value: any): any;
    /**
     * Обновить существующий объект по указанному свойству указанным значением
     * @param dest Целевой объект
     * @param propertyInfo Информация о свойстве
     * @param value Значение
     */
    static updateObject(dest: any, propertyInfo: IPropertyDescriptor, value: any): any;
    /**
     * Обновить копию объекта по указанному свойству указанным значением
     * @param source Исходный объект
     * @param propertyInfo Информация о свойстве
     * @param value Значение
     * @returns Копия объекта с обновленным значением
     */
    static updatedObject(source: any, propertyInfo: IPropertyDescriptor, value: any): any;
    objectName: string;
    descriptors: IPropertyDescriptor[];
    renderObject?: RenderObjectFunction;
    constructor();
    getProperties(): IPropertyDescriptor[];
    getPropertiesWithAnExceptions(exceptions: string[]): IPropertyDescriptor[];
    getPropertiesSorted(): IPropertyDescriptor[];
    getPropertyByName(name: string): IPropertyDescriptor;
    getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>;
}
//# sourceMappingURL=ObjectInfo.d.ts.map