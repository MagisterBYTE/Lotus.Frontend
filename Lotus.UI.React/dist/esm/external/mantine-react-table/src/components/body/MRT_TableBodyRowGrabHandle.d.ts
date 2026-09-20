import type { RefObject } from 'react';
import type { ActionIconProps } from '@mantine/core';
import type { MRT_Row, MRT_RowData, MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends ActionIconProps {
    row: MRT_Row<TData>;
    rowRef: RefObject<HTMLTableRowElement>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_TableBodyRowGrabHandle: <TData extends MRT_RowData>({ row, rowRef, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableBodyRowGrabHandle.d.ts.map