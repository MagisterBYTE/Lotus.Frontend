import { useMemo, useRef, useState } from 'react';
import { useReactTable } from '@tanstack/react-table';
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
 * The MRT hook that wraps the TanStack useReactTable hook and adds additional functionality
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
    //transform initial state with proper column order
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
    const [creatingRow, _setCreatingRow] = useState(initialState.creatingRow ?? null);
    const [columnFilterFns, setColumnFilterFns] = useState(() => Object.assign({}, ...getAllLeafColumnDefs(definedTableOptions.columns).map((col) => ({
        [getColumnId(col)]: col.filterFn instanceof Function
            ? (col.filterFn.name ?? 'custom')
            : (col.filterFn ??
                initialState?.columnFilterFns?.[getColumnId(col)] ??
                getDefaultColumnFilterFn(col)),
    }))));
    const [columnOrder, onColumnOrderChange] = useState(initialState.columnOrder ?? []);
    const [columnSizingInfo, onColumnSizingInfoChange] = useState(initialState.columnSizingInfo ?? {});
    const [density, setDensity] = useState(initialState?.density ?? 'md');
    const [draggingColumn, setDraggingColumn] = useState(initialState.draggingColumn ?? null);
    const [draggingRow, setDraggingRow] = useState(initialState.draggingRow ?? null);
    const [editingCell, setEditingCell] = useState(initialState.editingCell ?? null);
    const [editingRow, setEditingRow] = useState(initialState.editingRow ?? null);
    const [globalFilterFn, setGlobalFilterFn] = useState(initialState.globalFilterFn ?? 'fuzzy');
    const [grouping, onGroupingChange] = useState(initialState.grouping ?? []);
    const [hoveredColumn, setHoveredColumn] = useState(initialState.hoveredColumn ?? null);
    const [hoveredRow, setHoveredRow] = useState(initialState.hoveredRow ?? null);
    const [isFullScreen, setIsFullScreen] = useState(initialState?.isFullScreen ?? false);
    const [pagination, onPaginationChange] = useState(initialState?.pagination ?? { pageIndex: 0, pageSize: 10 });
    const [showAlertBanner, setShowAlertBanner] = useState(initialState?.showAlertBanner ?? false);
    const [showColumnFilters, setShowColumnFilters] = useState(initialState?.showColumnFilters ?? false);
    const [showGlobalFilter, setShowGlobalFilter] = useState(initialState?.showGlobalFilter ?? false);
    const [showToolbarDropZone, setShowToolbarDropZone] = useState(initialState?.showToolbarDropZone ?? false);
    definedTableOptions.state = {
        columnFilterFns,
        columnOrder,
        columnSizingInfo,
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
        ...definedTableOptions.state,
    };
    //The table options now include all state needed to help determine column visibility and order logic
    const statefulTableOptions = definedTableOptions;
    //don't recompute columnDefs while resizing column or dragging column/row
    const columnDefsRef = useRef([]);
    statefulTableOptions.columns =
        statefulTableOptions.state.columnSizingInfo.isResizingColumn ||
            statefulTableOptions.state.draggingColumn ||
            statefulTableOptions.state.draggingRow
            ? columnDefsRef.current
            : prepareColumns({
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
                    ...statefulTableOptions.columns,
                    ...[
                        showRowSpacerColumn(statefulTableOptions) &&
                            getMRT_RowSpacerColumnDef(statefulTableOptions),
                    ].filter(Boolean),
                ],
                tableOptions: statefulTableOptions,
            });
    columnDefsRef.current = statefulTableOptions.columns;
    //if loading, generate blank rows to show skeleton loaders
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
    //@ts-ignore
    const table = useReactTable({
        onColumnOrderChange,
        onColumnSizingInfoChange,
        onGroupingChange,
        onPaginationChange,
        ...statefulTableOptions,
        globalFilterFn: statefulTableOptions.filterFns?.[globalFilterFn ?? 'fuzzy'],
    });
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
    table.setCreatingRow = (row) => {
        let _row = row;
        if (row === true) {
            _row = createRow(table);
        }
        if (statefulTableOptions?.onCreatingRowChange) {
            statefulTableOptions.onCreatingRowChange(_row);
        }
        else {
            _setCreatingRow(_row);
        }
    };
    table.setColumnFilterFns =
        statefulTableOptions.onColumnFilterFnsChange ?? setColumnFilterFns;
    table.setDensity = statefulTableOptions.onDensityChange ?? setDensity;
    table.setDraggingColumn =
        statefulTableOptions.onDraggingColumnChange ?? setDraggingColumn;
    table.setDraggingRow =
        statefulTableOptions.onDraggingRowChange ?? setDraggingRow;
    table.setEditingCell =
        statefulTableOptions.onEditingCellChange ?? setEditingCell;
    table.setEditingRow =
        statefulTableOptions.onEditingRowChange ?? setEditingRow;
    table.setGlobalFilterFn =
        statefulTableOptions.onGlobalFilterFnChange ?? setGlobalFilterFn;
    table.setHoveredColumn =
        statefulTableOptions.onHoveredColumnChange ?? setHoveredColumn;
    table.setHoveredRow =
        statefulTableOptions.onHoveredRowChange ?? setHoveredRow;
    table.setIsFullScreen =
        statefulTableOptions.onIsFullScreenChange ?? setIsFullScreen;
    table.setShowAlertBanner =
        statefulTableOptions.onShowAlertBannerChange ?? setShowAlertBanner;
    table.setShowColumnFilters =
        statefulTableOptions.onShowColumnFiltersChange ?? setShowColumnFilters;
    table.setShowGlobalFilter =
        statefulTableOptions.onShowGlobalFilterChange ?? setShowGlobalFilter;
    table.setShowToolbarDropZone =
        statefulTableOptions.onShowToolbarDropZoneChange ?? setShowToolbarDropZone;
    useMRT_Effects(table);
    return table;
};
//# sourceMappingURL=useMRT_TableInstance.js.map