import type { MRT_Row, MRT_RowData, MRT_RowVirtualizer, MRT_TableInstance, MRT_VirtualItem } from '../../types';
import type { TableTdProps } from '@mantine/core';
import type { RefObject } from 'react';
interface Props<TData extends MRT_RowData> extends TableTdProps {
    parentRowRef: RefObject<HTMLTableRowElement | null>;
    renderedRowIndex?: number;
    row: MRT_Row<TData>;
    rowVirtualizer?: MRT_RowVirtualizer;
    striped?: false | string;
    table: MRT_TableInstance<TData>;
    virtualRow?: MRT_VirtualItem;
}
export declare const MRT_TableDetailPanel: <TData extends MRT_RowData>({ parentRowRef, renderedRowIndex, row, rowVirtualizer, striped, table, virtualRow, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableDetailPanel.d.ts.map