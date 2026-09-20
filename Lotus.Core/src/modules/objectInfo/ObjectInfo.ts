/* oxlint-disable typescript/no-explicit-any */
import { BooleanConverter, DateTimeConverter, NumberConverter } from '#converters';
import { ObjectHelper } from '#helpers';
import { IFilterFunctionDesc } from '#modules/filter';
import { Assert } from '#utils';
import { IPropertyDescriptor } from './PropertyDescriptor';
import { TPropertyTypes } from './PropertyType';

/**
 * Определение функции для рисования всего объект
 */
export type RenderObjectFunction = (item?: unknown, context?: unknown, index?: number) => unknown

/**
 * Интерфейс для представления(описания) свойств объектов
 */
export interface IObjectInfo
{
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
export interface IObjectInfoInspectable
{
  /**
   * Получение информации о объекте
   * @returns Информация о объекте
   */
  getObjectInfo(): IObjectInfo;
}

/**
 * Класс для представления(описания) свойств объектов
 */
export class ObjectInfo implements IObjectInfo
{
  // #region Static methods
  /**
   * Конвертация значения по указанному свойству
   * @param propertyInfo Информация о свойстве
   * @param value Исходное значение
   * @returns Целевое значение
   */
  public static convertedValue(propertyInfo: IPropertyDescriptor, value: any):any
  {
    const isNullable = Boolean(propertyInfo.isNullable);
    switch (propertyInfo.propertyType)
    {
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
  public static updateObject(dest:any, propertyInfo: IPropertyDescriptor, value: any)
  {
    const isEmpty = Assert.emptyValue(value);
    if (propertyInfo.isArray === false)
    {
      if (propertyInfo.isNullable)
      {
        if (isEmpty)
        {
          ObjectHelper.setValue(dest, propertyInfo.fieldName, undefined);
          return dest;
        }
        else
        {
          const actualValue = ObjectInfo.convertedValue(propertyInfo, value);
          ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
          return dest;
        }
      }
      else
      {
        if (isEmpty)
        {
          // oxlint-disable-next-line no-console
          console.log(`property ${propertyInfo.name} can not null value`);
          return dest;
        }
        else
        {
          const actualValue = ObjectInfo.convertedValue(propertyInfo, value);
          ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
          return dest;
        }
      }
    }
    else
    {
      if (propertyInfo.isNullable)
      {
        if (isEmpty)
        {
          ObjectHelper.setValue(dest, propertyInfo.fieldName, undefined);
          return dest;
        }
        else
        {
          if (Array.isArray(value))
          {
            const actualValue = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
            ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
            return dest;
          }
          else
          {
            const actualValue = [ObjectInfo.convertedValue(propertyInfo, value)];
            ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
            return dest;
          }
        }
      }
      else
      {
        if (Assert.emptyValue(value))
        {
          // oxlint-disable-next-line no-console
          console.log(`property ${propertyInfo.name} can not null value`);
          return dest;
        }
        else
        {
          if (Array.isArray(value))
          {
            const actualValue = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
            ObjectHelper.setValue(dest, propertyInfo.fieldName, actualValue);
            return dest;
          }
          else
          {
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
  public static updatedObject(source:any, propertyInfo: IPropertyDescriptor, value: any):any
  {
    const dest = { ...source };
    return ObjectInfo.updateObject(dest, propertyInfo, value);
  }
  // #endregion

  // #region Fields
  public objectName: string;
  public descriptors: IPropertyDescriptor[] = [];
  public renderObject?: RenderObjectFunction;
  // #endregion

  // #region Constructor
  constructor() 
  {
    this.objectName = '';
    this.getProperties = this.getProperties.bind(this);
    this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
    this.getPropertyByName = this.getPropertyByName.bind(this);
    this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
  }
  // #endregion

  // #region Main methods
  public getProperties(): IPropertyDescriptor[] 
  {
    return this.descriptors;
  }

  public getPropertiesWithAnExceptions(exceptions: string[]): IPropertyDescriptor[] 
  {
    return this.descriptors.filter(x => !exceptions.includes(x.fieldName));
  }

  public getPropertiesSorted(): IPropertyDescriptor[]
  {
    return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
  }

  public getPropertyByName(name: string): IPropertyDescriptor
  {
    return this.descriptors.find(x => x.fieldName === name)!;
  }

  public getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>
  {
    const filterFunctions: Record<string, IFilterFunctionDesc> = {};

    for (const x of this.descriptors) 
    {
      if (x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldNameBackend ?? x.fieldName}`] = x.filtering.functionDefaultDesc;
      }
    }

    return filterFunctions;
  }
  // #endregion
}