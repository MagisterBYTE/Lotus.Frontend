import type { Renderable } from '@tanstack/react-table';
import type { JSX, ReactNode } from 'react';
import type { MRT_ColumnHelper, MRT_Row, MRT_RowData, MRT_TableInstance } from '../types';
export declare const flexRender: (Comp: Renderable<any>, props: any) => JSX.Element | ReactNode;
/**
 * A helper utility for creating MRT column definitions with type inference
 * for each individual column's `TValue`. Mirrors v9's `createColumnHelper`
 * surface (`accessor`, `columns`, `display`, `group`) but bound to MRT's
 * column-def shape (extra MRT-specific props, `StockFeatures` pre-bound).
 *
 * From a JavaScript perspective, `display` / `group` / `columns` are identity
 * functions — they exist purely to anchor TypeScript inference.
 *
 * @example
 * ```tsx
 * const helper = createMRTColumnHelper<Person>()
 * const columns = helper.columns([
 *   helper.accessor('firstName', { header: 'First' }),
 *   helper.accessor((row) => row.lastName, { id: 'lastName' }),
 *   helper.display({ id: 'actions', header: 'Actions' }),
 * ])
 * ```
 */
export declare function createMRTColumnHelper<TData extends MRT_RowData>(): MRT_ColumnHelper<TData>;
export declare const createRow: <TData extends MRT_RowData>(table: MRT_TableInstance<TData>, originalRow?: TData, rowIndex?: number, depth?: number, subRows?: Array<MRT_Row<TData>>, parentId?: string) => MRT_Row<TData>;
//# sourceMappingURL=tanstack.helpers.d.ts.map