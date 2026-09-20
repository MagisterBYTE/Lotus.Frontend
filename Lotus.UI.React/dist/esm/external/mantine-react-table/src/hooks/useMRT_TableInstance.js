import { useMemo, useRef } from 'react';
import { useCreateAtom, useSelector } from '@tanstack/react-store';
import { useTable } from '@tanstack/react-table';
import { getAllLeafColumnDefs, getColumnId, getDefaultColumnFilterFn, prepareColumns, } from '../utils/column.utils';
import { getDefaultColumnOrderIds, showRowActionsColumn, showRowDragColumn, showRowExpandColumn, showRowNumbersColumn, showRowPinningColumn, showRowSelectionColumn, showRowSpacerColumn, } from '../utils/displayColumn.utils';
import { createRow } from '../utils/tanstack.helpers';
import { getMRT_RowActionsColumnDef } from './display-columns/getMRT_RowActionsColumnDef';
import { getMRT_RowDragColumnDef } from './display-columns/getMRT_RowDragColumnDef';
import { getMRT_RowExpandColumnDef } from './display-columns/getMRT_RowExpandColumnDef';
import { getMRT_RowNumbersColumnDef } from './display-columns/getMRT_RowNumbersColumnDef';
import { getMRT_RowPinningColumnDef } from './display-columns/getMRT_RowPinningColumnDef';
import { getMRT_RowSelectColumnDef } from './display-columns/getMRT_RowSelectColumnDef';
import { getMRT_RowSpacerColumnDef } from './display-columns/getMRT_RowSpacerColumnDef';
import { useMRT_Effects } from './useMRT_Effects';
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
export const useMRT_TableInstance = (definedTableOptions) => {
    const lastSelectedRowId = useRef(null);
    const bottomToolbarRef = useRef(null);
    const editInputRefs = useRef({});
    const filterInputRefs = useRef({});
    const searchInputRef = useRef(null);
    const tableContainerRef = useRef(null);
    const tableHeadCellRefs = useRef({});
    const tablePaperRef = useRef(null);
    const topToolbarRef = useRef(null);
    const tableHeadRef = useRef(null);
    const tableFooterRef = useRef(null);
    // transform initial state with proper column order
    const initialState = useMemo(() => {
        const initState = definedTableOptions.initialState ?? {};
        initState.columnOrder =
            initState.columnOrder ??
                getDefaultColumnOrderIds({
                    ...definedTableOptions,
                    state: {
                        ...definedTableOptions.initialState,
                        ...definedTableOptions.state,
                    },
                });
        initState.globalFilterFn = definedTableOptions.globalFilterFn ?? 'fuzzy';
        return initState;
    }, []);
    definedTableOptions.initialState = initialState;
    // ---------------------------------------------------------------------------
    // TanStack-aware atoms (passed to `useTable` via `atoms` option). The library
    // both reads and writes through these.
    // ---------------------------------------------------------------------------
    const columnOrderAtom = useCreateAtom(initialState.columnOrder ?? []);
    const columnResizingAtom = useCreateAtom(initialState.columnResizing ?? {});
    const groupingAtom = useCreateAtom(initialState.grouping ?? []);
    const paginationAtom = useCreateAtom(initialState?.pagination ?? { pageIndex: 0, pageSize: 10 });
    // Subscribe so the consumer re-renders when these slices change. (The library
    // also reads from these atoms internally; the subscriptions here are for the
    // MRT component tree.)
    const columnOrder = useSelector(columnOrderAtom);
    const columnResizing = useSelector(columnResizingAtom);
    const grouping = useSelector(groupingAtom);
    const pagination = useSelector(paginationAtom);
    // ---------------------------------------------------------------------------
    // MRT-only atoms — these slices aren't part of v9's `TableState` so they
    // can't be passed via the `atoms` option. They're maintained as standalone
    // atoms and merged into `table.state` after construction.
    // ---------------------------------------------------------------------------
    // Build the initial columnFilterFns map from each column's `filterFn` (or
    // the registered default if none set). Constructed as a plain Record so
    // `useCreateAtom`'s overload resolves to `Atom<T>` (writable) rather than
    // the function-style `ReadonlyAtom<T>` overload.
    const initialColumnFilterFns = {};
    for (const col of getAllLeafColumnDefs(definedTableOptions.columns)) {
        initialColumnFilterFns[getColumnId(col)] =
            col.filterFn instanceof Function
                ? (col.filterFn.name ?? 'custom')
                : (col.filterFn ??
                    initialState?.columnFilterFns?.[getColumnId(col)] ??
                    getDefaultColumnFilterFn(col));
    }
    const columnFilterFnsAtom = useCreateAtom(initialColumnFilterFns);
    const creatingRowAtom = useCreateAtom(initialState.creatingRow ?? null);
    const densityAtom = useCreateAtom(initialState?.density ?? 'md');
    const draggingColumnAtom = useCreateAtom(initialState.draggingColumn ?? null);
    const draggingRowAtom = useCreateAtom(initialState.draggingRow ?? null);
    const editingCellAtom = useCreateAtom(initialState.editingCell ?? null);
    const editingRowAtom = useCreateAtom(initialState.editingRow ?? null);
    const globalFilterFnAtom = useCreateAtom(initialState.globalFilterFn ?? 'fuzzy');
    const hoveredColumnAtom = useCreateAtom(initialState.hoveredColumn ?? null);
    const hoveredRowAtom = useCreateAtom(initialState.hoveredRow ?? null);
    const isFullScreenAtom = useCreateAtom(initialState?.isFullScreen ?? false);
    const showAlertBannerAtom = useCreateAtom(initialState?.showAlertBanner ?? false);
    const showColumnFiltersAtom = useCreateAtom(initialState?.showColumnFilters ?? false);
    const showGlobalFilterAtom = useCreateAtom(initialState?.showGlobalFilter ?? false);
    const showToolbarDropZoneAtom = useCreateAtom(initialState?.showToolbarDropZone ?? false);
    const columnFilterFns = useSelector(columnFilterFnsAtom);
    const creatingRow = useSelector(creatingRowAtom);
    const density = useSelector(densityAtom);
    const draggingColumn = useSelector(draggingColumnAtom);
    const draggingRow = useSelector(draggingRowAtom);
    const editingCell = useSelector(editingCellAtom);
    const editingRow = useSelector(editingRowAtom);
    const globalFilterFn = useSelector(globalFilterFnAtom);
    const hoveredColumn = useSelector(hoveredColumnAtom);
    const hoveredRow = useSelector(hoveredRowAtom);
    const isFullScreen = useSelector(isFullScreenAtom);
    const showAlertBanner = useSelector(showAlertBannerAtom);
    const showColumnFilters = useSelector(showColumnFiltersAtom);
    const showGlobalFilter = useSelector(showGlobalFilterAtom);
    const showToolbarDropZone = useSelector(showToolbarDropZoneAtom);
    const userState = definedTableOptions.state ?? {};
    const isSliceControlled = (key, onChangeKey) => userState[key] !== undefined ||
        definedTableOptions[onChangeKey] !== undefined;
    // Table v9: `options.atoms[key]` wins over `options.state[key]`. If MRT
    // always owns pagination/columnOrder/etc. via atoms, controlled TableView
    // state and `onPaginationChange` never reach the grid.
    const tableAtoms = {};
    if (!isSliceControlled('columnOrder', 'onColumnOrderChange')) {
        tableAtoms.columnOrder = columnOrderAtom;
    }
    if (!isSliceControlled('columnResizing', 'onColumnResizingChange')) {
        tableAtoms.columnResizing = columnResizingAtom;
    }
    if (!isSliceControlled('grouping', 'onGroupingChange')) {
        tableAtoms.grouping = groupingAtom;
    }
    if (!isSliceControlled('pagination', 'onPaginationChange')) {
        tableAtoms.pagination = paginationAtom;
    }
    // Mirror values into options.state so utilities that read
    // `tableOptions.state.X` (e.g. column prep, display-column factories) keep
    // working. The user can still override individual slices by setting
    // `definedTableOptions.state` from outside.
    definedTableOptions.state = {
        columnFilterFns,
        columnOrder,
        columnResizing,
        creatingRow,
        density,
        draggingColumn,
        draggingRow,
        editingCell,
        editingRow,
        globalFilterFn,
        grouping,
        hoveredColumn,
        hoveredRow,
        isFullScreen,
        pagination,
        showAlertBanner,
        showColumnFilters,
        showGlobalFilter,
        showToolbarDropZone,
        ...userState,
    };
    // The table options now include all state needed to help determine column visibility and order logic
    const statefulTableOptions = definedTableOptions;
    // Column preparation mutates/augments definitions and must rerun when an
    // input that affects those definitions changes. Keep the resulting array
    // stable across unrelated state updates such as pagination.
    const columnDefsRef = useRef([]);
    const columnPreparationDepsRef = useRef(undefined);
    const sourceColumns = statefulTableOptions.columns;
    const columnPreparationDeps = [
        sourceColumns,
        statefulTableOptions.defaultColumn,
        statefulTableOptions.defaultDisplayColumn,
        statefulTableOptions.displayColumnDefOptions,
        statefulTableOptions.filterFns,
        statefulTableOptions.sortFns,
        statefulTableOptions.localization,
        statefulTableOptions.state.columnFilterFns,
        statefulTableOptions.state.creatingRow,
        statefulTableOptions.state.grouping,
        statefulTableOptions.createDisplayMode,
        statefulTableOptions.editDisplayMode,
        statefulTableOptions.enableEditing,
        statefulTableOptions.enableExpandAll,
        statefulTableOptions.enableExpanding,
        statefulTableOptions.enableGrouping,
        statefulTableOptions.enableMultiRowSelection,
        statefulTableOptions.enableRowActions,
        statefulTableOptions.enableRowDragging,
        statefulTableOptions.enableRowNumbers,
        statefulTableOptions.enableRowOrdering,
        statefulTableOptions.enableRowPinning,
        statefulTableOptions.enableRowSelection,
        statefulTableOptions.enableSelectAll,
        statefulTableOptions.groupedColumnMode,
        statefulTableOptions.layoutMode,
        statefulTableOptions.positionExpandColumn,
        statefulTableOptions.renderDetailPanel,
        statefulTableOptions.rowNumberDisplayMode,
        statefulTableOptions.rowPinningDisplayMode,
    ];
    const previousColumnPreparationDeps = columnPreparationDepsRef.current;
    const columnPreparationChanged = !previousColumnPreparationDeps ||
        columnPreparationDeps.length !== previousColumnPreparationDeps.length ||
        columnPreparationDeps.some((dependency, index) => !Object.is(dependency, previousColumnPreparationDeps[index]));
    const freezePreparedColumns = !!columnDefsRef.current.length &&
        (statefulTableOptions.state.columnResizing.isResizingColumn ||
            !!statefulTableOptions.state.draggingColumn ||
            !!statefulTableOptions.state.draggingRow);
    if (columnPreparationChanged && !freezePreparedColumns) {
        columnDefsRef.current = prepareColumns({
            columnDefs: [
                ...[
                    showRowPinningColumn(statefulTableOptions) &&
                        getMRT_RowPinningColumnDef(statefulTableOptions),
                    showRowDragColumn(statefulTableOptions) &&
                        getMRT_RowDragColumnDef(statefulTableOptions),
                    showRowActionsColumn(statefulTableOptions) &&
                        getMRT_RowActionsColumnDef(statefulTableOptions),
                    showRowExpandColumn(statefulTableOptions) &&
                        getMRT_RowExpandColumnDef(statefulTableOptions),
                    showRowSelectionColumn(statefulTableOptions) &&
                        getMRT_RowSelectColumnDef(statefulTableOptions),
                    showRowNumbersColumn(statefulTableOptions) &&
                        getMRT_RowNumbersColumnDef(statefulTableOptions),
                ].filter(Boolean),
                ...sourceColumns,
                ...[
                    showRowSpacerColumn(statefulTableOptions) &&
                        getMRT_RowSpacerColumnDef(statefulTableOptions),
                ].filter(Boolean),
            ],
            tableOptions: statefulTableOptions,
        });
        columnPreparationDepsRef.current = columnPreparationDeps;
    }
    statefulTableOptions.columns = columnDefsRef.current;
    // if loading, generate blank rows to show skeleton loaders
    statefulTableOptions.data = useMemo(() => (statefulTableOptions.state.isLoading ||
        statefulTableOptions.state.showSkeletons) &&
        !statefulTableOptions.data.length
        ? [
            ...Array(Math.min(statefulTableOptions.state.pagination.pageSize, 20)).fill(null),
        ].map(() => Object.assign({}, ...getAllLeafColumnDefs(statefulTableOptions.columns).map((col) => ({
            [getColumnId(col)]: null,
        }))))
        : statefulTableOptions.data, [
        statefulTableOptions.data,
        statefulTableOptions.state.isLoading,
        statefulTableOptions.state.showSkeletons,
    ]);
    // Table v9: `options.atoms[key]` wins over controlled `options.state[key]`.
    // Only pass atoms for slices the consumer is not controlling, otherwise
    // `onPaginationChange` / `onColumnFiltersChange` update React state but the
    // grid keeps reading the stale atom (page 0, empty filters).
    const table = useTable({
        ...statefulTableOptions,
        globalFilterFn: (globalFilterFn ?? 'fuzzy'),
        atoms: tableAtoms,
    }, (state) => state);
    // v9 spells the resize setter `setcolumnResizing` (lowercase 'c') because
    // it's auto-generated from the state-key name. Expose a camelCase alias so
    // MRT consumers don't need to know about that quirk; route writes through
    // our owned atom directly.
    table.setColumnResizing = columnResizingAtom.set;
    // The v9 store doesn't track MRT-only slices, so `table.state` is missing
    // them after `useTable` returns. Patch them in here so all MRT components
    // can read `table.state.density`, `table.state.isFullScreen`, etc.
    table.state = {
        ...table.state,
        columnFilterFns,
        creatingRow,
        density,
        draggingColumn,
        draggingRow,
        editingCell,
        editingRow,
        globalFilterFn,
        hoveredColumn,
        hoveredRow,
        isFullScreen,
        showAlertBanner,
        showColumnFilters,
        showGlobalFilter,
        showToolbarDropZone,
    };
    // v8-style `getState()` alias for any consumer that still calls it.
    table.getState = () => table.state;
    table.refs = {
        bottomToolbarRef,
        editInputRefs,
        filterInputRefs,
        lastSelectedRowId,
        searchInputRef,
        tableContainerRef,
        tableFooterRef,
        tableHeadCellRefs,
        tableHeadRef,
        tablePaperRef,
        topToolbarRef,
    };
    // Setters write through atom.set (or call the user-supplied on*Change
    // handler if one was provided so external state ownership still works).
    // The `as any` casts bridge atom.set's overloaded signature with React's
    // `Dispatch<SetStateAction<T>>` shape — the runtime contract is identical
    // (both accept a value or an updater function).
    table.setCreatingRow = (row) => {
        let _row = row;
        if (row === true) {
            _row = createRow(table);
        }
        if (statefulTableOptions?.onCreatingRowChange) {
            statefulTableOptions.onCreatingRowChange(_row);
        }
        else {
            creatingRowAtom.set(_row);
        }
    };
    table.setColumnFilterFns = (statefulTableOptions.onColumnFilterFnsChange ??
        columnFilterFnsAtom.set);
    table.setDensity = (statefulTableOptions.onDensityChange ??
        densityAtom.set);
    table.setDraggingColumn = (statefulTableOptions.onDraggingColumnChange ??
        draggingColumnAtom.set);
    table.setDraggingRow = (statefulTableOptions.onDraggingRowChange ??
        draggingRowAtom.set);
    table.setEditingCell = (statefulTableOptions.onEditingCellChange ??
        editingCellAtom.set);
    table.setEditingRow = (statefulTableOptions.onEditingRowChange ??
        editingRowAtom.set);
    table.setGlobalFilterFn = (statefulTableOptions.onGlobalFilterFnChange ??
        globalFilterFnAtom.set);
    table.setHoveredColumn = (statefulTableOptions.onHoveredColumnChange ??
        hoveredColumnAtom.set);
    table.setHoveredRow = (statefulTableOptions.onHoveredRowChange ??
        hoveredRowAtom.set);
    table.setIsFullScreen = (statefulTableOptions.onIsFullScreenChange ??
        isFullScreenAtom.set);
    table.setShowAlertBanner = (statefulTableOptions.onShowAlertBannerChange ??
        showAlertBannerAtom.set);
    table.setShowColumnFilters =
        (statefulTableOptions.onShowColumnFiltersChange ??
            showColumnFiltersAtom.set);
    table.setShowGlobalFilter = (statefulTableOptions.onShowGlobalFilterChange ??
        showGlobalFilterAtom.set);
    table.setShowToolbarDropZone =
        (statefulTableOptions.onShowToolbarDropZoneChange ??
            showToolbarDropZoneAtom.set);
    useMRT_Effects(table);
    return table;
};
//# sourceMappingURL=useMRT_TableInstance.js.map