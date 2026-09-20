import type { ReactElement } from 'react';
import type { TableProps } from '@mantine/core';
import type { MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends TableProps {
    table: MRT_TableInstance<TData>;
    specificTableBody?: ReactElement;
}
export declare const MRT_Table: <TData extends MRT_RowData>({ table, specificTableBody, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_Table.d.ts.map