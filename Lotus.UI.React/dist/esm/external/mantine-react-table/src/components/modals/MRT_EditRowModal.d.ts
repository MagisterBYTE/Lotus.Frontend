import { type ModalProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends Partial<ModalProps> {
    open: boolean;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_EditRowModal: <TData extends MRT_RowData>({ open, table, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_EditRowModal.d.ts.map