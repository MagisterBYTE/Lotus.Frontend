import { JSX, type ReactNode } from 'react';
import { type Renderable } from '@tanstack/react-table';
import { type MRT_ColumnHelper, type MRT_Row, type MRT_RowData, type MRT_TableInstance } from '../types';
export declare const flexRender: (Comp: Renderable<any>, props: any) => JSX.Element | ReactNode;
export declare function createMRTColumnHelper<TData extends MRT_RowData>(): MRT_ColumnHelper<TData>;
export declare const createRow: <TData extends MRT_RowData>(table: MRT_TableInstance<TData>, originalRow?: TData, rowIndex?: number, depth?: number, subRows?: MRT_Row<TData>[], parentId?: string) => MRT_Row<TData>;
//# sourceMappingURL=tanstack.helpers.d.ts.map