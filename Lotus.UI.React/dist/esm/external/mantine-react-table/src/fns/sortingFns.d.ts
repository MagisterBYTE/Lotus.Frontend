import { type Row } from '@tanstack/react-table';
import { type MRT_Row, type MRT_RowData } from '../types';
export declare const MRT_SortingFns: {
    fuzzy: <TData extends MRT_RowData>(rowA: Row<TData>, rowB: Row<TData>, columnId: string) => number;
    alphanumeric: import("@tanstack/table-core").SortingFn<any>;
    alphanumericCaseSensitive: import("@tanstack/table-core").SortingFn<any>;
    text: import("@tanstack/table-core").SortingFn<any>;
    textCaseSensitive: import("@tanstack/table-core").SortingFn<any>;
    datetime: import("@tanstack/table-core").SortingFn<any>;
    basic: import("@tanstack/table-core").SortingFn<any>;
};
export declare const rankGlobalFuzzy: <TData extends MRT_RowData>(rowA: MRT_Row<TData>, rowB: MRT_Row<TData>) => number;
//# sourceMappingURL=sortingFns.d.ts.map