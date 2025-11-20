import { type TableProps, type TableTrProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TableTrProps {
    table: MRT_TableInstance<TData>;
    tableProps: Partial<TableProps>;
}
export declare const MRT_TableBodyEmptyRow: <TData extends MRT_RowData>({ table, tableProps, ...commonRowProps }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableBodyEmptyRow.d.ts.map