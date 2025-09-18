/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc {
    id: number;
    type: TPropertyType;
}
/**
 * Тип свойства
 */
export type TPropertyType = 'Boolean' | 'Integer' | 'Double' | 'Enum' | 'String' | 'DateTime' | 'Guid';
/**
 * Дескрипторы (перечисление) для типа свойства
 */
export declare const PropertyTypeDescriptors: Record<TPropertyType, IPropertyTypeDesc>;
//# sourceMappingURL=PropertyType.d.ts.map