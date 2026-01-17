import { TPropertyType, TPropertyTypes } from './PropertyType';

/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc
{
  id: number,
  type: TPropertyType,
}

/**
 * Дескрипторы (перечисление) для типа свойства
 */
export const PropertyTypeDescriptors: Record<TPropertyType, IPropertyTypeDesc> =
  {
    /**
     * Логический тип
     */
    bool:
    {
      id: 0,
      type: TPropertyTypes.Bool
    },

    /**
     * Целый тип (byte, short, int)
     */
    int:
    {
      id: 1,
      type: TPropertyTypes.Int
    },

    /**
     * Целый тип (long)
     */
    long:
    {
      id: 2,
      type: TPropertyTypes.Long
    },

    /**
     * Вещественный тип (float)
     */
    float:
    {
      id: 3,
      type: TPropertyTypes.Float
    },

    /**
     * Вещественный тип (float)
     */
    double:
    {
      id: 4,
      type: TPropertyTypes.Double
    },

    /**
     * Тип перечисления (на базовом уровне ведет себя как числовой)
     */
    enum:
    {
      id: 5,
      type: TPropertyTypes.Enum
    },

    /**
     * Строковый тип
     */
    string:
    {
      id: 6,
      type: TPropertyTypes.String
    },

    /**
     * Тип даты-времени
     */
    dateTime:
    {
      id: 7,
      type: TPropertyTypes.DateTime
    },

    /**
     * Глобальный идентификатор в формате UUID
     */
    guid:
    {
      id: 8,
      type: TPropertyTypes.Guid
    }
  } as const;