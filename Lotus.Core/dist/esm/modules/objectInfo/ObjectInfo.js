/* oxlint-disable typescript/no-explicit-any */
import { BooleanConverter, DateTimeConverter, NumberConverter } from '#converters';
import { ObjectHelper } from '#helpers';
import { Assert } from '#utils';
import { TPropertyTypes } from './PropertyType';
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
        switch (propertyInfo.propertyType) {
            case TPropertyTypes.String: return typeof value === 'string' ? value : String(value);
            case TPropertyTypes.Bool: return BooleanConverter.toBooleanNullable(value, isNullable);
            case TPropertyTypes.Int: return NumberConverter.toIntegerNullable(value, isNullable);
            case TPropertyTypes.Long: return NumberConverter.toIntegerNullable(value, isNullable);
            case TPropertyTypes.Float: return NumberConverter.toFloatNullable(value, isNullable);
            case TPropertyTypes.Double: return NumberConverter.toFloatNullable(value, isNullable);
            case TPropertyTypes.Enum: return NumberConverter.toIntegerNullable(value, isNullable);
            case TPropertyTypes.DateTime: return DateTimeConverter.toDateTimeNullable(value, isNullable);
            case TPropertyTypes.Guid: return typeof value === 'string' ? value : String(value);
            case TPropertyTypes.Object: return value;
        }
    }
    /**
     * Обновить существующий объект по указанному свойству указанным значением
     * @param dest Целевой объект
     * @param propertyInfo Информация о свойстве
     * @param value Значение
     */
    static updateObject(dest, propertyInfo, value) {
        const isEmpty = Assert.emptyValue(value);
        if (propertyInfo.isArray === false) {
            if (propertyInfo.isNullable) {
                if (isEmpty) {
                    ObjectHelper.setValue(dest, propertyInfo.fieldName, undefined);
                    return dest;
                }
                else {
                    const actualValue = ObjectInfo.convertedValue(propertyInfo, value);
                    ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                    return dest;
                }
            }
            else {
                if (isEmpty) {
                    // oxlint-disable-next-line no-console
                    console.log(`property ${propertyInfo.name} can not null value`);
                    return dest;
                }
                else {
                    const actualValue = ObjectInfo.convertedValue(propertyInfo, value);
                    ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                    return dest;
                }
            }
        }
        else {
            if (propertyInfo.isNullable) {
                if (isEmpty) {
                    ObjectHelper.setValue(dest, propertyInfo.fieldName, undefined);
                    return dest;
                }
                else {
                    if (Array.isArray(value)) {
                        const actualValue = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
                        ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                        return dest;
                    }
                    else {
                        const actualValue = [ObjectInfo.convertedValue(propertyInfo, value)];
                        ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                        return dest;
                    }
                }
            }
            else {
                if (Assert.emptyValue(value)) {
                    // oxlint-disable-next-line no-console
                    console.log(`property ${propertyInfo.name} can not null value`);
                    return dest;
                }
                else {
                    if (Array.isArray(value)) {
                        const actualValue = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
                        ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                        return dest;
                    }
                    else {
                        const actualValue = [ObjectInfo.convertedValue(propertyInfo, value)];
                        ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
                        return dest;
                    }
                }
            }
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
        return ObjectInfo.updateObject(dest, propertyInfo, value);
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
    getPropertiesWithAnExceptions(exceptions) {
        return this.descriptors.filter(x => !exceptions.includes(x.fieldName));
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