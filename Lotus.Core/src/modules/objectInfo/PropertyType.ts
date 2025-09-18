/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc
{
  id: number,
  type: TPropertyType,
}

/**
 * Тип свойства
 */
export type TPropertyType = 'Boolean' | 'Integer' | 'Double' | 'Enum' | 'String' | 'DateTime' | 'Guid';

/**
 * Дескрипторы (перечисление) для типа свойства
 */
export const PropertyTypeDescriptors: Record<TPropertyType, IPropertyTypeDesc> =
  {
    /**
     * Логический тип
     */
    Boolean:
    {
      id: 0,
      type: 'Boolean'
    },

    /**
     * Целый тип (byte, short, int, long, enum)
     */
    Integer:
    {
      id: 1,
      type: 'Integer'
    },

    /**
     * Вещественный тип (float, double, decimal)
     */
    Double:
    {
      id: 2,
      type: 'Double'
    },

    /**
     * Тип перечисления (на базовом уровне ведет себя как числовой)
     */
    Enum:
    {
      id: 3,
      type: 'Enum'
    },

    /**
     * Строковый тип
     */
    String:
    {
      id: 4,
      type: 'String'
    },

    /**
     * Тип даты-времени
     */
    DateTime:
    {
      id: 5,
      type: 'DateTime'
    },

    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid:
    {
      id: 6,
      type: 'Guid'
    }
  } as const;