/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanConverter, DateTimeConverter, NumberConverter } from '#converters';
import { Assert } from '#utils';
/**
 * Класс для представления(описания) свойств объектов
 */
export class ObjectInfo {
    // #region Static methods
    /**
     * Конвертация значения по указанному свойству
     * @param propertyInfo Информация о свойстве
     * @param value Исходное значение
     * @returns Целевое значение
     */
    static convertedValue(propertyInfo, value) {
        const isNullable = Boolean(propertyInfo.isNullable);
        switch (propertyInfo.propertyTypeDesc.type) {
            case 'string': return typeof value === 'string' ? value : String(value);
            case 'bool': return BooleanConverter.toBooleanNullable(value, isNullable);
            case 'int': return NumberConverter.toIntegerNullable(value, isNullable);
            case 'long': return NumberConverter.toIntegerNullable(value, isNullable);
            case 'float': return NumberConverter.toFloatNullable(value, isNullable);
            case 'double': return NumberConverter.toFloatNullable(value, isNullable);
            case 'enum': return NumberConverter.toIntegerNullable(value, isNullable);
            case 'dateTime': return DateTimeConverter.toDateTimeNullable(value, isNullable);
            case 'guid': return typeof value === 'string' ? value : String(value);
        }
    }
    /**
     * Обновить копию объекта по указанному свойству указанным значением
     * @param source Исходный объект
     * @param propertyInfo Информация о свойстве
     * @param value Значение
     * @returns Копия объекта с обновленным значением
     */
    static updatedObject(source, propertyInfo, value) {
        const dest = { ...source };
        const isEmpty = Assert.emptyValue(value);
        if (propertyInfo.isArray === false) {
            if (propertyInfo.isNullable) {
                if (isEmpty) {
                    dest[propertyInfo.fieldName] = undefined;
                    return dest;
                }
                else {
                    dest[propertyInfo.fieldName] = ObjectInfo.convertedValue(propertyInfo, value);
                    return dest;
                }
            }
            else {
                if (isEmpty) {
                    // eslint-disable-next-line no-console
                    console.log(`property ${propertyInfo.name} can not null value`);
                    return dest;
                }
                else {
                    dest[propertyInfo.fieldName] = ObjectInfo.convertedValue(propertyInfo, value);
                    return dest;
                }
            }
        }
        else {
            if (propertyInfo.isNullable) {
                if (isEmpty) {
                    dest[propertyInfo.fieldName] = undefined;
                    return dest;
                }
                else {
                    if (Array.isArray(value)) {
                        dest[propertyInfo.fieldName] = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
                        return dest;
                    }
                    else {
                        dest[propertyInfo.fieldName] = [ObjectInfo.convertedValue(propertyInfo, value)];
                        return dest;
                    }
                }
            }
            else {
                if (Assert.emptyValue(value)) {
                    // eslint-disable-next-line no-console
                    console.log(`property ${propertyInfo.name} can not null value`);
                    return dest;
                }
                else {
                    if (Array.isArray(value)) {
                        dest[propertyInfo.fieldName] = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
                        return dest;
                    }
                    else {
                        dest[propertyInfo.fieldName] = [ObjectInfo.convertedValue(propertyInfo, value)];
                        return dest;
                    }
                }
            }
        }
    }
    // #endregion
    // #region Fields
    objectName;
    descriptors = [];
    renderObject;
    // #endregion
    // #region Constructor
    constructor() {
        this.objectName = '';
        this.getProperties = this.getProperties.bind(this);
        this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
        this.getPropertyByName = this.getPropertyByName.bind(this);
        this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
    }
    // #endregion
    // #region Main methods
    getProperties() {
        return this.descriptors;
    }
    getPropertiesSorted() {
        return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
    }
    getPropertyByName(name) {
        return this.descriptors.find(x => x.fieldName === name);
    }
    getFilterFunctionsDesc() {
        const filterFunctions = {};
        for (const x of this.descriptors) {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldNameBackend ?? x.fieldName}`] = x.filtering.functionDefaultDesc;
            }
        }
        return filterFunctions;
    }
}
//# sourceMappingURL=ObjectInfo.js.map