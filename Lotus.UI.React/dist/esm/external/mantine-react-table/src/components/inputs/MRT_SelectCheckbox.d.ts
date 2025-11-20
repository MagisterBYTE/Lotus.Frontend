import { type CheckboxProps } from '@mantine/core';
import { type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends CheckboxProps {
    renderedRowIndex?: number;
    row?: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_SelectCheckbox: <TData extends MRT_RowData>({ renderedRowIndex, row, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_SelectCheckbox.d.ts.map