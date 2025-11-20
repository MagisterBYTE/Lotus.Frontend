import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionIcon, Tooltip } from '@mantine/core';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
export const MRT_ToggleRowActionMenuButton = ({ cell, row, table, }) => {
    const { getState, options: { createDisplayMode, editDisplayMode, enableEditing, icons: { IconEdit }, localization: { edit }, renderRowActionMenuItems, renderRowActions, }, setEditingRow, } = table;
    const { creatingRow, editingRow } = getState();
    const isCreating = creatingRow?.id === row.id;
    const isEditing = editingRow?.id === row.id;
    const handleStartEditMode = (event) => {
        event.stopPropagation();
        setEditingRow({ ...row });
    };
    const showEditActionButtons = (isCreating && createDisplayMode === 'row') ||
        (isEditing && editDisplayMode === 'row');
    return (_jsx(_Fragment, { children: renderRowActions && !showEditActionButtons ? (renderRowActions({ cell, row, table })) : showEditActionButtons ? (_jsx(MRT_EditActionButtons, { row: row, table: table })) : !renderRowActionMenuItems &&
            parseFromValuesOrFunc(enableEditing, row) ? (_jsx(Tooltip, { label: edit, openDelay: 1000, position: "right", withinPortal: true, children: _jsx(ActionIcon, { "aria-label": edit, color: "gray", disabled: !!editingRow && editingRow.id !== row.id, onClick: handleStartEditMode, size: "md", variant: "subtle", children: _jsx(IconEdit, {}) }) })) : renderRowActionMenuItems ? (_jsx(MRT_RowActionMenu, { handleEdit: handleStartEditMode, row: row, table: table })) : null }));
};
//# sourceMappingURL=MRT_ToggleRowActionMenuButton.js.map