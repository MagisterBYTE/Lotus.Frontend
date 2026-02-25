import { type PaperProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { ReactElement } from 'react';
interface Props<TData extends MRT_RowData> extends PaperProps {
    table: MRT_TableInstance<TData>;
    specificTableBody?: ReactElement;
}
export declare const MRT_TablePaper: <TData extends MRT_RowData>({ table, specificTableBody, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TablePaper.d.ts.map