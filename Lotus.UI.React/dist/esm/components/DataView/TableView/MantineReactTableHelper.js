import { StringHelper } from 'lotus-core/helpers';
import { FilterFunctionDescriptors } from 'lotus-core/modules/filter';
import { PropertyTypeDescriptors } from 'lotus-core/modules/objectInfo';
import { FilterPropertyConstants } from 'lotus-core/modules/requestAndResponse';
export class MantineReactTableHelper {
    // #region Property
    /**
     * Конвертация описания свойства в колонку MantineReactTable
     * @param property Описание свойства объекта
     * @returns
     */
    static convertPropertyDescriptorToColumn(property) {
        const column = {
            accessorKey: property.fieldName,
            header: property.name,
            // Фильтрация
            enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
            filterVariant: property.filtering && property.filtering.variant,
            filterFn: MantineReactTableHelper.getDefaultFilterFunction(property),
            // Сортировка
            enableSorting: (property.sorting && property.sorting.enabled) ?? false,
            // Редактирование
            enableEditing: (property.editing && property.editing.enabled) ?? false
        };
        return column;
    }
    /**
     * Конвертация описания объекта в колонки MantineReactTable
     * @param objectInfo Описание объекта
     * @returns Колонки MantineReactTable
     */
    static convertObjectInfoToColumns(objectInfo) {
        const properties = objectInfo.getProperties();
        const columns = properties.map((x) => {
            const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(x);
            return column;
        });
        return columns;
    }
    // #endregion
    // #region Filter
    /**
     * Получение функции фильтрации MantineReactTable по умолчанию для свойства объекта
     * @param property Описание свойства объекта
     * @returns Функция фильтрации MantineReactTable
     */
    static getDefaultFilterFunction(property) {
        switch (property.propertyTypeDesc) {
            case PropertyTypeDescriptors.String:
                return 'contains';
            case PropertyTypeDescriptors.Enum:
                return 'arrIncludesSome';
        }
        return 'equals';
    }
    /**
     * Конвертация состояния фильтров MantineReactTable в объекты фильтрации
     * @param objectInfo Описание объекта
     * @param columnFilters Состояние фильтров MantineReactTable
     * @param columnFiltersFns Состояние функций фильтрации MantineReactTable
     * @returns
     */
    static convertColumnsFilterStateToFilterObjects(objectInfo, columnFilters, columnFiltersFns) {
        // Получаем все свойства объекта
        const properties = objectInfo.getProperties();
        // Фильтруем данные
        const filteringAll = columnFilters.map((column) => {
            const filter = FilterPropertyConstants.Empty;
            const property = properties.find((x) => x.fieldName === column.id);
            if (property?.filtering && property?.filtering.enabled && columnFiltersFns) {
                const filterFn = columnFiltersFns[column.id];
                filter.propertyPath = StringHelper.capitalizeFirstLetter(column.id);
                filter.propertyTypeDesc = property.propertyTypeDesc;
                filter.function = MantineReactTableHelper.convertToFilterFunctionDesc(filterFn);
                if (filter.function === FilterFunctionDescriptors.Between ||
                    filter.function === FilterFunctionDescriptors.IncludeAll ||
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
    /**
     * Конвертация типа FilterOption MantineReactTable в описание функции фильтрации
     * @param filterFn Значение FilterOption MantineReactTable
     * @returns
     */
    static convertToFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case 'equals':
                return FilterFunctionDescriptors.Equals;
            case 'equalsString':
                return FilterFunctionDescriptors.Equals;
            case 'notEquals':
                return FilterFunctionDescriptors.NotEqual;
            case 'lessThan':
                return FilterFunctionDescriptors.LessThan;
            case 'greaterThan':
                return FilterFunctionDescriptors.GreaterThan;
            case 'greaterThanOrEqualTo':
                return FilterFunctionDescriptors.LessThanOrEqual;
            case 'between':
                return FilterFunctionDescriptors.Between;
            case 'betweenInclusive':
                return FilterFunctionDescriptors.Between;
            case 'contains':
                return FilterFunctionDescriptors.Contains;
            case 'startsWith':
                return FilterFunctionDescriptors.StartsWith;
            case 'endsWith':
                return FilterFunctionDescriptors.EndsWith;
            case 'notEmpty':
                return FilterFunctionDescriptors.NotEmpty;
            case 'empty':
                return FilterFunctionDescriptors.Empty;
            case 'includeAny':
                return FilterFunctionDescriptors.IncludeAny;
            case 'includeAll':
                return FilterFunctionDescriptors.IncludeAll;
            case 'includeEquals':
                return FilterFunctionDescriptors.IncludeEquals;
            case 'includeNone':
                return FilterFunctionDescriptors.IncludeNone;
            default:
                return FilterFunctionDescriptors.Equals;
        }
    }
    /**
     * Конвертация описание функции фильтрации в тип FilterOption MantineReactTable
     * @param filterFn Описание функции фильтрации
     * @returns
     */
    static convertFromFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case FilterFunctionDescriptors.Equals:
                return 'equals';
            case FilterFunctionDescriptors.NotEqual:
                return 'notEquals';
            case FilterFunctionDescriptors.LessThan:
                return 'lessThan';
            case FilterFunctionDescriptors.LessThanOrEqual:
                return 'lessThanOrEqualTo';
            case FilterFunctionDescriptors.GreaterThan:
                return 'greaterThan';
            case FilterFunctionDescriptors.GreaterThanOrEqual:
                return 'greaterThanOrEqualTo';
            case FilterFunctionDescriptors.Between:
                return 'between';
            case FilterFunctionDescriptors.Contains:
                return 'contains';
            case FilterFunctionDescriptors.StartsWith:
                return 'startsWith';
            case FilterFunctionDescriptors.EndsWith:
                return 'endsWith';
            case FilterFunctionDescriptors.NotEmpty:
                return 'notEmpty';
            case FilterFunctionDescriptors.Empty:
                return 'empty';
            case FilterFunctionDescriptors.IncludeAny:
                return 'includeAny';
            case FilterFunctionDescriptors.IncludeAll:
                return 'includeAll';
            case FilterFunctionDescriptors.IncludeEquals:
                return 'includeEquals';
            case FilterFunctionDescriptors.IncludeNone:
                return 'includeNone';
            default:
                return 'equals';
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
    // #endregion
    // #region Sorting
    /**
     * Конвертация состояния сортировки MantineReactTable в объекты сортировки
     * @param objectInfo Описание объекта
     * @param columnSortState Состояние сортировки MantineReactTable
     * @returns
     */
    static convertColumnsSortStateToSortObjects(objectInfo, columnSortState) {
        const sortings = columnSortState.map((column) => {
            const sort = {
                propertyPath: StringHelper.capitalizeFirstLetter(column.id),
                propertyTypeDesc: objectInfo.getPropertyByName(column.id).propertyTypeDesc,
                isDesc: column.desc
            };
            return sort;
        });
        return sortings;
    }
}
//# sourceMappingURL=MantineReactTableHelper.js.map