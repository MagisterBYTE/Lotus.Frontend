/**
 * Дескрипторы (перечисление) для типа свойства
 */
export const PropertyTypeDescriptors = {
    /**
     * Логический тип
     */
    Boolean: {
        id: 0,
        type: 'Boolean'
    },
    /**
     * Целый тип (byte, short, int, long, enum)
     */
    Integer: {
        id: 1,
        type: 'Integer'
    },
    /**
     * Вещественный тип (float, double, decimal)
     */
    Double: {
        id: 2,
        type: 'Double'
    },
    /**
     * Строковый тип
     */
    String: {
        id: 3,
        type: 'String'
    },
    /**
     * Тип даты-времени
     */
    DateTime: {
        id: 4,
        type: 'DateTime'
    },
    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid: {
        id: 5,
        type: 'Guid'
    }
};
