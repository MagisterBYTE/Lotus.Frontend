import { TPropertyTypes } from './PropertyType';
/**
 * Дескрипторы (перечисление) для типа свойства
 */
export const PropertyTypeDescriptors = {
    /**
     * Логический тип
     */
    Bool: {
        id: 0,
        type: TPropertyTypes.Bool
    },
    /**
     * Целый тип (byte, short, int)
     */
    Int: {
        id: 1,
        type: TPropertyTypes.Int
    },
    /**
     * Целый тип (long)
     */
    Long: {
        id: 2,
        type: TPropertyTypes.Long
    },
    /**
     * Вещественный тип (float)
     */
    Float: {
        id: 3,
        type: TPropertyTypes.Float
    },
    /**
     * Вещественный тип (float)
     */
    Double: {
        id: 4,
        type: TPropertyTypes.Double
    },
    /**
     * Тип перечисления (на базовом уровне ведет себя как числовой)
     */
    Enum: {
        id: 5,
        type: TPropertyTypes.Enum
    },
    /**
     * Строковый тип
     */
    String: {
        id: 6,
        type: TPropertyTypes.String
    },
    /**
     * Тип даты-времени
     */
    DateTime: {
        id: 7,
        type: TPropertyTypes.DateTime
    },
    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid: {
        id: 8,
        type: TPropertyTypes.Guid
    }
};
//# sourceMappingURL=PropertyTypeDesc.js.map