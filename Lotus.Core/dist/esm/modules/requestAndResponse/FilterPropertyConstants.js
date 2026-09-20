import { FilterFunctionDescriptors } from '#modules/filter';
import { TPropertyTypes } from '#modules/objectInfo';
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
        propertyType: TPropertyTypes.Bool
    };
}
//# sourceMappingURL=FilterPropertyConstants.js.map