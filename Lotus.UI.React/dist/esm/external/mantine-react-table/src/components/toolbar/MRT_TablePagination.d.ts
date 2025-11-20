import { type PaginationProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends Partial<PaginationProps> {
    position?: 'bottom' | 'top';
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TablePagination: <TData extends MRT_RowData>({ position, table, ...props }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TablePagination.d.ts.map