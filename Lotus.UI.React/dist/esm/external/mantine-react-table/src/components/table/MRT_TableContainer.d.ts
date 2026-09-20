import type { MRT_RowData, MRT_TableInstance } from '../../types';
import type { BoxProps } from '@mantine/core';
import type { ReactElement } from 'react';
interface Props<TData extends MRT_RowData> extends BoxProps {
    table: MRT_TableInstance<TData>;
    specificTableBody?: ReactElement;
}
export declare const MRT_TableContainer: <TData extends MRT_RowData>({ table, specificTableBody, ...rest }: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MRT_TableContainer.d.ts.map