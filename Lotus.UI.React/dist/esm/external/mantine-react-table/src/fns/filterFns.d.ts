import { type RankingInfo } from '@tanstack/match-sorter-utils';
import { type Row } from '@tanstack/react-table';
import { type MRT_FilterOption, type MRT_Localization, type MRT_RowData } from '../types';
export declare const MRT_FilterFns: {
    between: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValues: [number | string, number | string]): boolean;
        autoRemove(val: any): boolean;
    };
    betweenInclusive: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValues: [number | string, number | string]): boolean;
        autoRemove(val: any): boolean;
    };
    contains: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    empty: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, _filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    endsWith: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    equals: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    fuzzy: {
        <TData extends MRT_RowData>(row: Row<TData>, columnId: string, filterValue: number | string, addMeta: (item: RankingInfo) => void): boolean;
        autoRemove(val: any): boolean;
    };
    greaterThan: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    greaterThanOrEqualTo: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    lessThan: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    lessThanOrEqualTo: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    notEmpty: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, _filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    notEquals: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    startsWith: {
        <TData extends MRT_RowData>(row: Row<TData>, id: string, filterValue: number | string): boolean;
        autoRemove(val: any): boolean;
    };
    includesString: import("@tanstack/table-core").FilterFn<any>;
    includesStringSensitive: import("@tanstack/table-core").FilterFn<any>;
    equalsString: import("@tanstack/table-core").FilterFn<any>;
    arrIncludes: import("@tanstack/table-core").FilterFn<any>;
    arrIncludesAll: import("@tanstack/table-core").FilterFn<any>;
    arrIncludesSome: import("@tanstack/table-core").FilterFn<any>;
    weakEquals: import("@tanstack/table-core").FilterFn<any>;
    inNumberRange: import("@tanstack/table-core").FilterFn<any>;
};
export declare function localizedFilterOption(localization: MRT_Localization, option: MRT_FilterOption): string;
//# sourceMappingURL=filterFns.d.ts.map