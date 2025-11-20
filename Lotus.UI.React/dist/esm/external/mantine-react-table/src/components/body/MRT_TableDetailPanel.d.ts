import { type RefObject } from 'react';
import { type TableTdProps } from '@mantine/core';
import { type MRT_Row, type MRT_RowData, type MRT_RowVirtualizer, type MRT_TableInstance, type MRT_VirtualItem } from '../../types';
interface Props<TData extends MRT_RowData> extends TableTdProps {
    parentRowRef: RefObject<HTMLTableRowElement>;
    renderedRowIndex?: number;
    row: MRT_Row<TData>;
    rowVirtualizer?: MRT_RowVirtualizer;
    striped?: false | string;
    table: MRT_TableInstance<TData>;
    virtualRow?: MRT_VirtualItem;
}
export declare const MRT_TableDetailPanel: <TData extends MRT_RowData>({ parentRowRef, renderedRowIndex, row, rowVirtualizer, striped, table, virtualRow, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableDetailPanel.d.ts.map