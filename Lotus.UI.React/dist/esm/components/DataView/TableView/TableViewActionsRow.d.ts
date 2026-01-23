import { IRecordObject } from 'lotus-core/types';
import React from 'react';
import { MRT_Cell, MRT_Row, MRT_TableInstance } from '#external/mantine-react-table';
export interface IActionRowProps<TItem extends IRecordObject> {
    cell: MRT_Cell<TItem>;
    table: MRT_TableInstance<TItem>;
    row: MRT_Row<TItem>;
}
export interface IEditActionRowProps<TItem extends IRecordObject> extends IActionRowProps<TItem> {
    onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}
export declare const EditActionRow: <TItem extends IRecordObject>(props: IEditActionRowProps<TItem>) => React.ReactNode;
//# sourceMappingURL=TableViewActionsRow.d.ts.map