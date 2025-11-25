import { StringHelper } from 'lotus-core/helpers';
import { FilterFunctionDescriptors } from 'lotus-core/modules/filter';
import { PropertyTypeDescriptors } from 'lotus-core/modules/objectInfo';
export class MantineReactTableHelper {
    static getDefaultFilterFunction(property) {
        switch (property.propertyTypeDesc) {
            case PropertyTypeDescriptors.String: return 'contains';
            case PropertyTypeDescriptors.Enum: return 'arrIncludesSome';
        }
        return 'equals';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convertPropertyDescriptorToColumn(property) {
        const column = {
            accessorKey: property.fieldName,
            header: property.name,
            // Фильтрация
            enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
            filterVariant: property.filtering && property.filtering.variant,
            filterFn: MantineReactTableHelper.getDefaultFilterFunction(property),
            // columnFilterModeOptions: property.options,
            // Сортировка
            enableSorting: (property.sorting && property.sorting.enabled) ?? false,
            // Редактирование
            enableEditing: (property.editing && property.editing.enabled) ?? false
        };
        return column;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convertObjectInfoToColumns(objectInfo) {
        const properties = objectInfo.getProperties();
        const columns = properties.map((x) => {
            const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(x);
            return column;
        });
        return columns;
    }
    static convertColumnsFilterToFilterObjects(objectInfo, columnFilters, columnFiltersFns) {
        const properties = objectInfo.getProperties();
        const filteringAll = columnFilters.map((column) => {
            const filter = {
                propertyPath: '',
                propertyTypeDesc: PropertyTypeDescriptors.Boolean,
                function: FilterFunctionDescriptors.Equals,
                value: ''
            };
            const property = properties.find((x) => x.fieldName === column.id);
            if (property?.filtering && property?.filtering.enabled && columnFiltersFns) {
                const filterFn = columnFiltersFns[column.id];
                filter.propertyPath = StringHelper.capitalizeFirstLetter(column.id);
                filter.propertyTypeDesc = property.propertyTypeDesc;
                filter.function = MantineReactTableHelper.convertToFilterFunctionDesc(filterFn);
                if (filter.function === FilterFunctionDescriptors.IncludeAll ||
                    filter.function === FilterFunctionDescriptors.IncludeAny ||
                    filter.function === FilterFunctionDescriptors.IncludeEquals ||
                    filter.function === FilterFunctionDescriptors.IncludeNone) {
                    filter.values = column.value;
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    filter.value = column.value.toString();
                }
                filter.function = MantineReactTableHelper.convertToFilterFunctionDesc(filterFn);
            }
            return filter;
        });
        const filtering = filteringAll.filter((x) => x.propertyPath !== '');
        return filtering;
    }
    static convertToFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case 'equals': return FilterFunctionDescriptors.Equals;
            case 'equalsString': return FilterFunctionDescriptors.Equals;
            case 'notEquals': return FilterFunctionDescriptors.NotEqual;
            case 'lessThan': return FilterFunctionDescriptors.LessThan;
            case 'greaterThan': return FilterFunctionDescriptors.GreaterThan;
            case 'greaterThanOrEqualTo': return FilterFunctionDescriptors.LessThanOrEqual;
            case 'between': return FilterFunctionDescriptors.Between;
            case 'betweenInclusive': return FilterFunctionDescriptors.Between;
            case 'contains': return FilterFunctionDescriptors.Contains;
            case 'startsWith': return FilterFunctionDescriptors.StartsWith;
            case 'endsWith': return FilterFunctionDescriptors.EndsWith;
            case 'notEmpty': return FilterFunctionDescriptors.NotEmpty;
            case 'includeAny': return FilterFunctionDescriptors.IncludeAny;
            case 'includeAll': return FilterFunctionDescriptors.IncludeAll;
            case 'includeEquals': return FilterFunctionDescriptors.IncludeEquals;
            case 'includeNone': return FilterFunctionDescriptors.IncludeNone;
            default: return FilterFunctionDescriptors.Equals;
        }
    }
    static convertFromFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case FilterFunctionDescriptors.Equals: return 'equals';
            case FilterFunctionDescriptors.NotEqual: return 'notEquals';
            case FilterFunctionDescriptors.LessThan: return 'lessThan';
            case FilterFunctionDescriptors.LessThanOrEqual: return 'lessThanOrEqualTo';
            case FilterFunctionDescriptors.GreaterThan: return 'greaterThan';
            case FilterFunctionDescriptors.GreaterThanOrEqual: return 'greaterThanOrEqualTo';
            case FilterFunctionDescriptors.Between: return 'between';
            case FilterFunctionDescriptors.Contains: return 'contains';
            case FilterFunctionDescriptors.StartsWith: return 'startsWith';
            case FilterFunctionDescriptors.EndsWith: return 'endsWith';
            case FilterFunctionDescriptors.NotEmpty: return 'notEmpty';
            case FilterFunctionDescriptors.IncludeAny: return 'includeAny';
            case FilterFunctionDescriptors.IncludeAll: return 'includeAll';
            case FilterFunctionDescriptors.IncludeEquals: return 'includeEquals';
            case FilterFunctionDescriptors.IncludeNone: return 'includeNone';
            default: return 'equals';
        }
    }
    /**
     * Получение списка функций фильтрации для свойств
     */
    static getFilterOptions(objectInfo) {
        const filterFunctions = {};
        objectInfo.getProperties().forEach((x) => {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldName}`] = MantineReactTableHelper.convertFromFilterFunctionDesc(x.filtering.functionDefaultDesc);
            }
        });
        return filterFunctions;
    }
}
//# sourceMappingURL=MantineReactTableHelper.js.map