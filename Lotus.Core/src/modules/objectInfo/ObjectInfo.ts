/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanConverter, DateTimeConverter, NumberConverter } from '#converters';
import { IFilterFunctionDesc } from '#modules/filter';
import { Assert } from '#utils';
import { IPropertyDescriptor } from './PropertyDescriptor';

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
  getFilterFunctionsDesc(): Record<string, IFilterFunctionDesc>
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
    switch (propertyInfo.propertyTypeDesc.type)
    {
      case 'string': return typeof value === 'string' ? value : String(value);
      case 'bool':return BooleanConverter.toBooleanNullable(value, isNullable);
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
  public static updatedObject(source:any, propertyInfo: IPropertyDescriptor, value: any):any
  {
    const dest = { ...source };
    const isEmpty = Assert.emptyValue(value);
    if (propertyInfo.isArray === false)
    {
      if (propertyInfo.isNullable)
      {
        if (isEmpty)
        {
          dest[propertyInfo.fieldName] = undefined;
          return dest;
        }
        else
        {
          dest[propertyInfo.fieldName] = ObjectInfo.convertedValue(propertyInfo, value);
          return dest;
        }
      }
      else
      {
        if (isEmpty)
        {
          // eslint-disable-next-line no-console
          console.log(`property ${propertyInfo.name} can not null value`);
          return dest;
        }
        else
        {
          dest[propertyInfo.fieldName] = ObjectInfo.convertedValue(propertyInfo, value);
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
          dest[propertyInfo.fieldName] = undefined;
          return dest;
        }
        else
        {
          if (Array.isArray(value))
          {
            dest[propertyInfo.fieldName] = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
            return dest;
          }
          else
          {
            dest[propertyInfo.fieldName] = [ObjectInfo.convertedValue(propertyInfo, value)];
            return dest;
          }
        }
      }
      else
      {
        if (Assert.emptyValue(value))
        {
          // eslint-disable-next-line no-console
          console.log(`property ${propertyInfo.name} can not null value`);
          return dest;
        }
        else
        {
          if (Array.isArray(value))
          {
            dest[propertyInfo.fieldName] = value.map((x) => ObjectInfo.convertedValue(propertyInfo, x));
            return dest;
          }
          else
          {
            dest[propertyInfo.fieldName] = [ObjectInfo.convertedValue(propertyInfo, value)];
            return dest;
          }
        }
      }
    }
  }
  // #endregion

  // #region Fields
  public objectName: string;
  public descriptors: IPropertyDescriptor[] = [];
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