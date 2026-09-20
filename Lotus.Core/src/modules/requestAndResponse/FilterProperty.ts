import { IFilterFunctionDesc } from '#modules/filter';
import { TPropertyType } from '#modules/objectInfo';

/**
 * Интерфейс для фильтрации по одному свойству
 */
export interface IFilterProperty
{
  /**
   * Имя/путь свойства/поля по которому осуществляется фильтрация.
   * Для доступа к вложенным свойствам в качестве разделителя используется точка
   */
  propertyPath: string;

  /**
   * Функция для фильтрации
   */
  function: IFilterFunctionDesc;

  /**
   * Описание типа свойства
   */
  propertyType: TPropertyType;

  /**
   * Статус типа свойства - массив
   */
  isArray?: boolean;

  /**
  * Учитывать регистр при фильтрации строк
  */
  isSensitiveCase?: boolean;

  /**
   * Статус типа свойства Nullable.
   */
  isNullable?: boolean;

  /**
   * Значение
   */
  value?: string;

  /**
   * Массив значений
   */
  values?: string[];
}

/**
 * Тип для фильтрации объектов
 */
export type IFilterPropertyCollection = IFilterProperty[];