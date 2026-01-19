import { TPropertyType } from './PropertyType';
/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc {
    id: number;
    type: TPropertyType;
}
/**
 * Дескрипторы (перечисление) для типа свойства
 */
export declare const PropertyTypeDescriptors: Record<Capitalize<TPropertyType>, IPropertyTypeDesc>;
//# sourceMappingURL=PropertyTypeDesc.d.ts.map