import type { MRT_DefinedTableOptions, MRT_RowData, MRT_TableInstance } from '../types';
/**
 * The MRT hook that wraps the TanStack `useTable` hook and adds MRT-specific
 * state, refs, and helpers. State management is built on top of TanStack
 * Store atoms (`useCreateAtom` from `@tanstack/react-store`):
 *
 * - **TanStack-aware slices** (`columnOrder`, `columnResizing`, `grouping`,
 *   `pagination`) are passed via the `atoms` option on `useTable`. Library
 *   writes (e.g. `table.setSorting(...)`, `table.firstPage()`) flow directly
 *   through these atoms, and they're automatically tracked in
 *   `table.state` by the v9 store.
 * - **MRT-only slices** (`density`, `isFullScreen`, `creatingRow`,
 *   `editingCell`, `editingRow`, `draggingColumn`, `draggingRow`,
 *   `hoveredColumn`, `hoveredRow`, `globalFilterFn`, `columnFilterFns`,
 *   `showAlertBanner`, `showColumnFilters`, `showGlobalFilter`,
 *   `showToolbarDropZone`) live in atoms outside the v9 store and are
 *   merged into `table.state` after construction so MRT components can read
 *   them via the same `state` surface.
 *
 * @param definedTableOptions - table options with proper defaults set
 * @returns the MRT table instance
 */
export declare const useMRT_TableInstance: <TData extends MRT_RowData>(definedTableOptions: MRT_DefinedTableOptions<TData>) => MRT_TableInstance<TData>;
//# sourceMappingURL=useMRT_TableInstance.d.ts.map