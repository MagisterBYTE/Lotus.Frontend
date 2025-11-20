import { getAllLeafColumnDefs, getColumnId } from './column.utils';
export function defaultDisplayColumnProps({ header, id, size, tableOptions, }) {
    const { defaultDisplayColumn, displayColumnDefOptions, localization } = tableOptions;
    return {
        ...defaultDisplayColumn,
        header: header ? localization[header] : '',
        size,
        ...displayColumnDefOptions?.[id],
        id,
    };
}
export const showRowPinningColumn = (tableOptions) => {
    const { enableRowPinning, rowPinningDisplayMode } = tableOptions;
    return !!(enableRowPinning && !rowPinningDisplayMode?.startsWith('select'));
};
export const showRowDragColumn = (tableOptions) => {
    const { enableRowDragging, enableRowOrdering } = tableOptions;
    return !!(enableRowDragging || enableRowOrdering);
};
export const showRowExpandColumn = (tableOptions) => {
    const { enableExpanding, enableGrouping, renderDetailPanel, state: { grouping }, } = tableOptions;
    return !!(enableExpanding ||
        (enableGrouping && grouping?.length) ||
        renderDetailPanel);
};
export const showRowActionsColumn = (tableOptions) => {
    const { createDisplayMode, editDisplayMode, enableEditing, enableRowActions, state: { creatingRow }, } = tableOptions;
    return !!(enableRowActions ||
        (creatingRow && createDisplayMode === 'row') ||
        (enableEditing && ['modal', 'row'].includes(editDisplayMode ?? '')));
};
export const showRowSelectionColumn = (tableOptions) => !!tableOptions.enableRowSelection;
export const showRowNumbersColumn = (tableOptions) => !!tableOptions.enableRowNumbers;
export const showRowSpacerColumn = (tableOptions) => tableOptions.layoutMode === 'grid-no-grow';
export const getLeadingDisplayColumnIds = (tableOptions) => [
    showRowPinningColumn(tableOptions) && 'mrt-row-pin',
    showRowDragColumn(tableOptions) && 'mrt-row-drag',
    tableOptions.positionActionsColumn === 'first' &&
        showRowActionsColumn(tableOptions) &&
        'mrt-row-actions',
    tableOptions.positionExpandColumn === 'first' &&
        showRowExpandColumn(tableOptions) &&
        'mrt-row-expand',
    showRowSelectionColumn(tableOptions) && 'mrt-row-select',
    showRowNumbersColumn(tableOptions) && 'mrt-row-numbers',
].filter(Boolean);
export const getTrailingDisplayColumnIds = (tableOptions) => [
    tableOptions.positionActionsColumn === 'last' &&
        showRowActionsColumn(tableOptions) &&
        'mrt-row-actions',
    tableOptions.positionExpandColumn === 'last' &&
        showRowExpandColumn(tableOptions) &&
        'mrt-row-expand',
    showRowSpacerColumn(tableOptions) && 'mrt-row-spacer',
].filter(Boolean);
export const getDefaultColumnOrderIds = (tableOptions, reset = false) => {
    const { state: { columnOrder: currentColumnOrderIds = [] }, } = tableOptions;
    const leadingDisplayColIds = getLeadingDisplayColumnIds(tableOptions);
    const trailingDisplayColIds = getTrailingDisplayColumnIds(tableOptions);
    const defaultColumnDefIds = getAllLeafColumnDefs(tableOptions.columns).map((columnDef) => getColumnId(columnDef));
    let allLeafColumnDefIds = reset
        ? defaultColumnDefIds
        : Array.from(new Set([...currentColumnOrderIds, ...defaultColumnDefIds]));
    allLeafColumnDefIds = allLeafColumnDefIds.filter((colId) => !leadingDisplayColIds.includes(colId) &&
        !trailingDisplayColIds.includes(colId));
    return [
        ...leadingDisplayColIds,
        ...allLeafColumnDefIds,
        ...trailingDisplayColIds,
    ];
};
//# sourceMappingURL=displayColumn.utils.js.map