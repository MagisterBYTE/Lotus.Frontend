import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { TableProps, TableTrProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
}
export declare const MRT_TableBodyEmptyRow: <TData extends MRT_RowData>({ table, tableProps, ...commonRowProps }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableBodyEmptyRow.d.ts.map