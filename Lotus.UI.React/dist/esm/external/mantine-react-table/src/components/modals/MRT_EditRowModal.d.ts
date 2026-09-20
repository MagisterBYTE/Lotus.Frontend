import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { ModalProps } from '@mantine/core';
interface Props<TData extends MRT_RowData> extends Partial<ModalProps> {
    open: boolean;
    table: MRT_TableInstance<TData>;
}
export declare const MRT_EditRowModal: <TData extends MRT_RowData>({ open, table, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_EditRowModal.d.ts.map