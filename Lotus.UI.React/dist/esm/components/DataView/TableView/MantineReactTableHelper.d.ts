import { IFilterFunctionDesc } from 'lotus-core/modules/filter';
import { IObjectInfo, IPropertyDescriptor } from 'lotus-core/modules/objectInfo';
import { IFilterPropertyCollection } from 'lotus-core/modules/requestAndResponse';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from '#external/mantine-react-table';
export declare class MantineReactTableHelper {
    static getDefaultFilterFunction(property: IPropertyDescriptor): MRT_FilterOption;
    static convertPropertyDescriptorToColumn<TItem extends Record<string, any>>(property: IPropertyDescriptor): MRT_ColumnDef<TItem>;
    static convertObjectInfoToColumns<TItem extends Record<string, any>>(objectInfo: IObjectInfo): MRT_ColumnDef<TItem>[];
    static convertColumnsFilterToFilterObjects(objectInfo: IObjectInfo, columnFilters: MRT_ColumnFiltersState, columnFiltersFns: Record<string, MRT_FilterOption> | undefined): IFilterPropertyCollection;
    static convertToFilterFunctionDesc(filterFn: MRT_FilterOption): IFilterFunctionDesc;
    static convertFromFilterFunctionDesc(filterFn: IFilterFunctionDesc): MRT_FilterOption;
    /**
     * Получение списка функций фильтрации для свойств
     */
    static getFilterOptions(objectInfo: IObjectInfo): Record<string, MRT_FilterOption>;
}
//# sourceMappingURL=MantineReactTableHelper.d.ts.map