import { SortingState } from '@tanstack/react-table';
import { IFilterFunctionDesc } from 'lotus-core/modules/filter';
import { IObjectInfo, IPropertyDescriptor } from 'lotus-core/modules/objectInfo';
import { IFilterPropertyCollection } from 'lotus-core/modules/requestAndResponse';
import { IRecordObject } from 'lotus-core/types';
import { ISortPropertyCollection } from 'node_modules/lotus-core/dist/esm/modules/requestAndResponse/SortProperty';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from '#external/mantine-react-table';
export declare class MantineReactTableHelper {
    /**
     * Конвертация описания свойства в колонку MantineReactTable
     * @param property Описание свойства объекта
     * @returns
     */
    static convertPropertyDescriptorToColumn<TItem extends IRecordObject>(property: IPropertyDescriptor): MRT_ColumnDef<TItem>;
    /**
     * Конвертация описания объекта в колонки MantineReactTable
     * @param objectInfo Описание объекта
     * @returns Колонки MantineReactTable
     */
    static convertObjectInfoToColumns<TItem extends IRecordObject>(objectInfo: IObjectInfo): MRT_ColumnDef<TItem>[];
    /**
     * Получение функции фильтрации MantineReactTable по умолчанию для свойства объекта
     * @param property Описание свойства объекта
     * @returns Функция фильтрации MantineReactTable
     */
    static getDefaultFilterFunction(property: IPropertyDescriptor): MRT_FilterOption;
    /**
     * Конвертация состояния фильтров MantineReactTable в объекты фильтрации
     * @param objectInfo Описание объекта
     * @param columnFilters Состояние фильтров MantineReactTable
     * @param columnFiltersFns Состояние функций фильтрации MantineReactTable
     * @returns
     */
    static convertColumnsFilterStateToFilterObjects(objectInfo: IObjectInfo, columnFilters: MRT_ColumnFiltersState, columnFiltersFns: Record<string, MRT_FilterOption> | undefined): IFilterPropertyCollection;
    /**
     * Конвертация типа FilterOption MantineReactTable в описание функции фильтрации
     * @param filterFn Значение FilterOption MantineReactTable
     * @returns
     */
    static convertToFilterFunctionDesc(filterFn: MRT_FilterOption): IFilterFunctionDesc;
    /**
     * Конвертация описание функции фильтрации в тип FilterOption MantineReactTable
     * @param filterFn Описание функции фильтрации
     * @returns
     */
    static convertFromFilterFunctionDesc(filterFn: IFilterFunctionDesc): MRT_FilterOption;
    /**
     * Получение списка функций фильтрации для свойств
     */
    static getFilterOptions(objectInfo: IObjectInfo): Record<string, MRT_FilterOption>;
    /**
     * Конвертация состояния сортировки MantineReactTable в объекты сортировки
     * @param objectInfo Описание объекта
     * @param columnSortState Состояние сортировки MantineReactTable
     * @returns
     */
    static convertColumnsSortStateToSortObjects(objectInfo: IObjectInfo, columnSortState: SortingState): ISortPropertyCollection;
}
//# sourceMappingURL=MantineReactTableHelper.d.ts.map