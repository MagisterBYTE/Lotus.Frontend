import type { MRT_RowData, MRT_TableInstance, MRT_TableOptions, Xor } from '../types';
import type { ReactElement } from 'react';
type TableInstanceProp<TData extends MRT_RowData> = {
    table: MRT_TableInstance<TData>;
    specificTableBody?: ReactElement;
};
type Props<TData extends MRT_RowData> = Xor<TableInstanceProp<TData>, MRT_TableOptions<TData>>;
export declare const MantineReactTable: <TData extends MRT_RowData>(props: Props<TData>) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MantineReactTable.d.ts.map