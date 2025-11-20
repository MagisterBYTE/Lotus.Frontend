import { type MRT_DefinedTableOptions, type MRT_RowData, type MRT_TableInstance } from '../types';
/**
 * The MRT hook that wraps the TanStack useReactTable hook and adds additional functionality
 * @param definedTableOptions - table options with proper defaults set
 * @returns the MRT table instance
 */
export declare const useMRT_TableInstance: <TData extends MRT_RowData>(definedTableOptions: MRT_DefinedTableOptions<TData>) => MRT_TableInstance<TData>;
//# sourceMappingURL=useMRT_TableInstance.d.ts.map