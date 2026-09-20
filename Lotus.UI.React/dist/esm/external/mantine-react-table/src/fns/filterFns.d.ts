import type { RankingInfo } from '@tanstack/match-sorter-utils';
import type { Row, StockFeatures } from '@tanstack/react-table';
import type { MRT_FilterOption, MRT_Localization, MRT_RowData } from '../types';
declare const fuzzy: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, columnId: string, filterValue: number | string, addMeta: (item: RankingInfo) => void): boolean;
    autoRemove: (val: any) => boolean;
};
declare const contains: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const startsWith: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const endsWith: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const equals: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const notEquals: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const greaterThan: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const greaterThanOrEqualTo: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const lessThan: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const lessThanOrEqualTo: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const between: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValues: [number | string, number | string]): boolean;
    autoRemove: (val: any) => boolean;
};
declare const betweenInclusive: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, filterValues: [number | string, number | string]): boolean;
    autoRemove: (val: any) => boolean;
};
declare const empty: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, _filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
declare const notEmpty: {
    <TData extends MRT_RowData>(row: Row<StockFeatures, TData>, id: string, _filterValue: number | string): boolean;
    autoRemove: (val: any) => boolean;
};
export declare const MRT_FilterFns: {
    arrIncludes: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    arrIncludesAll: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    arrHas: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    arrIncludesSome: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    equalsString: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    equalsStringSensitive: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    inDateRange: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    inNumberRange: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    includesString: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    includesStringSensitive: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    weakEquals: import("@tanstack/table-core").CreatedFilterFn<any, any>;
    between: typeof between;
    betweenInclusive: typeof betweenInclusive;
    contains: typeof contains;
    empty: typeof empty;
    endsWith: typeof endsWith;
    equals: typeof equals;
    fuzzy: typeof fuzzy;
    greaterThan: typeof greaterThan;
    greaterThanOrEqualTo: typeof greaterThanOrEqualTo;
    lessThan: typeof lessThan;
    lessThanOrEqualTo: typeof lessThanOrEqualTo;
    notEmpty: typeof notEmpty;
    notEquals: typeof notEquals;
    startsWith: typeof startsWith;
};
export declare function localizedFilterOption(localization: MRT_Localization, option: MRT_FilterOption): string;
export {};
//# sourceMappingURL=filterFns.d.ts.map