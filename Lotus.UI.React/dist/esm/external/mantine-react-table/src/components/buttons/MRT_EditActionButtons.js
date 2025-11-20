import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_EditActionButtons.module.css';
import { ActionIcon, Box, Button, Tooltip } from '@mantine/core';
export const MRT_EditActionButtons = ({ row, table, variant = 'icon', ...rest }) => {
    const { getState, options: { icons: { IconCircleX, IconDeviceFloppy }, localization, onCreatingRowCancel, onCreatingRowSave, onEditingRowCancel, onEditingRowSave, }, refs: { editInputRefs }, setCreatingRow, setEditingRow, } = table;
    const { creatingRow, editingRow, isSaving } = getState();
    const isCreating = creatingRow?.id === row.id;
    const isEditing = editingRow?.id === row.id;
    const handleCancel = () => {
        if (isCreating) {
            onCreatingRowCancel?.({ row, table });
            setCreatingRow(null);
        }
        else if (isEditing) {
            onEditingRowCancel?.({ row, table });
            setEditingRow(null);
        }
        row._valuesCache = {}; //reset values cache
    };
    const handleSubmitRow = () => {
        //look for auto-filled input values
        Object.values(editInputRefs?.current)
            .filter((inputRef) => row.id === inputRef?.name?.split('_')?.[0])
            ?.forEach((input) => {
            if (input.value !== undefined &&
                Object.hasOwn(row?._valuesCache, input.name)) {
                // @ts-ignore
                row._valuesCache[input.name] = input.value;
            }
        });
        if (isCreating)
            onCreatingRowSave?.({
                exitCreatingMode: () => setCreatingRow(null),
                row,
                table,
                values: row._valuesCache,
            });
        else if (isEditing) {
            onEditingRowSave?.({
                exitEditingMode: () => setEditingRow(null),
                row,
                table,
                values: row?._valuesCache,
            });
        }
    };
    return (_jsx(Box, { className: clsx('mrt-edit-action-buttons', classes.root), onClick: (e) => e.stopPropagation(), ...rest, children: variant === 'icon' ? (_jsxs(_Fragment, { children: [_jsx(Tooltip, { label: localization.cancel, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": localization.cancel, color: "red", onClick: handleCancel, variant: "subtle", children: _jsx(IconCircleX, {}) }) }), _jsx(Tooltip, { label: localization.save, withinPortal: true, children: _jsx(ActionIcon, { "aria-label": localization.save, color: "blue", loading: isSaving, onClick: handleSubmitRow, variant: "subtle", children: _jsx(IconDeviceFloppy, {}) }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: handleCancel, variant: "subtle", children: localization.cancel }), _jsx(Button, { loading: isSaving, onClick: handleSubmitRow, variant: "filled", children: localization.save })] })) }));
};
//# sourceMappingURL=MRT_EditActionButtons.js.map