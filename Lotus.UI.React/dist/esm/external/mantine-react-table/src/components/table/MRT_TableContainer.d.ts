import { ReactElement } from 'react';
import { type BoxProps } from '@mantine/core';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
interface Props<TData extends MRT_RowData> extends BoxProps {
    table: MRT_TableInstance<TData>;
    specificTableBody?: ReactElement;
}
export declare const MRT_TableContainer: <TData extends MRT_RowData>({ table, specificTableBody, ...rest }: Props<TData>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableContainer.d.ts.map