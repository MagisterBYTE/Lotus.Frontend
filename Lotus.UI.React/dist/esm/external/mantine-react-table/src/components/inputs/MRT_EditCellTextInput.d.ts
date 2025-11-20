import { type MultiSelectProps, type SelectProps, type TextInputProps } from '@mantine/core';
import { type MRT_Cell, type MRT_CellValue, type MRT_RowData, type MRT_TableInstance } from '../../types';
interface PropsTextInput<TData extends MRT_RowData, TValue = MRT_CellValue> extends TextInputProps {
    cell: MRT_Cell<TData, TValue>;
    table: MRT_TableInstance<TData>;
}
interface PropsSelect<TData extends MRT_RowData, TValue = MRT_CellValue> extends SelectProps {
    cell: MRT_Cell<TData, TValue>;
    table: MRT_TableInstance<TData>;
}
interface PropsMultiSelect<TData extends MRT_RowData, TValue = MRT_CellValue> extends MultiSelectProps {
    cell: MRT_Cell<TData, TValue>;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_EditCellTextInput: <TData extends MRT_RowData>({ cell, table, ...rest }: PropsMultiSelect<TData> | PropsSelect<TData> | PropsTextInput<TData>) => string | number | bigint | boolean | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
export {};
//# sourceMappingURL=MRT_EditCellTextInput.d.ts.map