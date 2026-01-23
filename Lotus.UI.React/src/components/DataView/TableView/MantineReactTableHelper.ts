import { SortingState } from '@tanstack/react-table';
import { StringHelper } from 'lotus-core/helpers';
import { FilterFunctionDescriptors, IFilterFunctionDesc } from 'lotus-core/modules/filter';
import { IObjectInfo, IPropertyDescriptor, PropertyTypeDescriptors } from 'lotus-core/modules/objectInfo';
import { FilterPropertyConstants, IFilterProperty, IFilterPropertyCollection, ISortProperty } from 'lotus-core/modules/requestAndResponse';
import { IRecordObject } from 'lotus-core/types';
import { ISortPropertyCollection } from 'node_modules/lotus-core/dist/esm/modules/requestAndResponse/SortProperty';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from '#external/mantine-react-table';

export class MantineReactTableHelper 
{
  // #region Property
  /**
   * Конвертация описания свойства в колонку MantineReactTable
   * @param property Описание свойства объекта
   * @returns
   */
  public static convertPropertyDescriptorToColumn<TItem extends IRecordObject>(property: IPropertyDescriptor): MRT_ColumnDef<TItem> 
  {
    const column: MRT_ColumnDef<TItem> = {
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
  public static convertObjectInfoToColumns<TItem extends IRecordObject>(objectInfo: IObjectInfo): MRT_ColumnDef<TItem>[] 
  {
    const properties = objectInfo.getProperties();

    const columns = properties.map((x) => 
    {
      const column = MantineReactTableHelper.convertPropertyDescriptorToColumn<TItem>(x);
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
  public static getDefaultFilterFunction(property: IPropertyDescriptor): MRT_FilterOption 
  {
    switch (property.propertyTypeDesc) 
    {
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
  public static convertColumnsFilterStateToFilterObjects(
    objectInfo: IObjectInfo,
    columnFilters: MRT_ColumnFiltersState,
    columnFiltersFns: Record<string, MRT_FilterOption> | undefined
  ): IFilterPropertyCollection 
  {
    // Получаем все свойства объекта
    const properties = objectInfo.getProperties();

    // Фильтруем данные
    const filteringAll: IFilterPropertyCollection = columnFilters.map((column) => 
    {
      const filter: IFilterProperty = FilterPropertyConstants.Empty;

      const property = properties.find((x) => x.fieldName === column.id);

      if (property?.filtering && property?.filtering.enabled && columnFiltersFns) 
      {
        const filterFn = columnFiltersFns[column.id];

        filter.propertyPath = StringHelper.capitalizeFirstLetter(column.id);
        filter.propertyTypeDesc = property.propertyTypeDesc!;
        filter.function = MantineReactTableHelper.convertToFilterFunctionDesc(filterFn);

        if (
          filter.function === FilterFunctionDescriptors.Between ||
          filter.function === FilterFunctionDescriptors.IncludeAll ||
          filter.function === FilterFunctionDescriptors.IncludeAny ||
          filter.function === FilterFunctionDescriptors.IncludeEquals ||
          filter.function === FilterFunctionDescriptors.IncludeNone
        ) 
        {
          filter.values = column.value as string[];
        }
        else 
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filter.value = (column.value as any).toString();
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
  public static convertToFilterFunctionDesc(filterFn: MRT_FilterOption): IFilterFunctionDesc 
  {
    switch (filterFn) 
    {
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
  public static convertFromFilterFunctionDesc(filterFn: IFilterFunctionDesc): MRT_FilterOption 
  {
    switch (filterFn) 
    {
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
  public static getFilterOptions(objectInfo: IObjectInfo): Record<string, MRT_FilterOption> 
  {
    const filterFunctions: Record<string, MRT_FilterOption> = {};

    objectInfo.getProperties().forEach((x) => 
    {
      if (x.filtering && x.filtering.enabled) 
      {
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
  public static convertColumnsSortStateToSortObjects(objectInfo: IObjectInfo, columnSortState: SortingState): ISortPropertyCollection 
  {
    const sortings: ISortPropertyCollection = columnSortState.map((column) => 
    {
      const sort: ISortProperty = {
        propertyPath: StringHelper.capitalizeFirstLetter(column.id),
        propertyTypeDesc: objectInfo.getPropertyByName(column.id).propertyTypeDesc,
        isDesc: column.desc
      };
    
      return sort;
    });

    return sortings;
  }
  // #endregion
}
