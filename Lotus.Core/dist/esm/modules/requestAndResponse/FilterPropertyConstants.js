import { FilterFunctionDescriptors } from '#modules/filter';
import { PropertyTypeDescriptors } from '#modules/objectInfo';
/**
 * Константы для фильтрации
 */
export class FilterPropertyConstants {
    /**
     * Пустой фильтр
     */
    static Empty = {
        function: FilterFunctionDescriptors.Equals,
        propertyPath: '',
        propertyTypeDesc: PropertyTypeDescriptors.Bool
    };
}
//# sourceMappingURL=FilterPropertyConstants.js.map