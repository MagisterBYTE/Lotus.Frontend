import type { Row, StockFeatures } from '@tanstack/react-table';
import type { MRT_Row, MRT_RowData } from '../types';
declare const fuzzy: <TData extends MRT_RowData>(rowA: Row<StockFeatures, TData>, rowB: Row<StockFeatures, TData>, columnId: string) => number;
export declare const MRT_SortFns: {
    alphanumeric: import("@tanstack/table-core").CreatedSortFn<any, any>;
    alphanumericCaseSensitive: import("@tanstack/table-core").CreatedSortFn<any, any>;
    basic: import("@tanstack/table-core").CreatedSortFn<any, any>;
    datetime: import("@tanstack/table-core").CreatedSortFn<any, any>;
    text: import("@tanstack/table-core").CreatedSortFn<any, any>;
    textCaseSensitive: import("@tanstack/table-core").CreatedSortFn<any, any>;
    fuzzy: typeof fuzzy;
};
export declare const rankGlobalFuzzy: <TData extends MRT_RowData>(rowA: MRT_Row<TData>, rowB: MRT_Row<TData>) => number;
export {};
//# sourceMappingURL=sortingFns.d.ts.map