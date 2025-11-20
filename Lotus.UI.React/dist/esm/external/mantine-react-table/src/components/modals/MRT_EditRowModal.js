import { createElement as _createElement } from "react";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Modal, Stack } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import { MRT_EditCellTextInput } from '../inputs/MRT_EditCellTextInput';
export const MRT_EditRowModal = ({ open, table, ...rest }) => {
    const { getState, options: { mantineCreateRowModalProps, mantineEditRowModalProps, onCreatingRowCancel, onEditingRowCancel, renderCreateRowModalContent, renderEditRowModalContent, }, setCreatingRow, setEditingRow, } = table;
    const { creatingRow, editingRow } = getState();
    const row = (creatingRow ?? editingRow);
    const arg = { row, table };
    const modalProps = {
        ...parseFromValuesOrFunc(mantineEditRowModalProps, arg),
        ...(creatingRow && parseFromValuesOrFunc(mantineCreateRowModalProps, arg)),
        ...rest,
    };
    const internalEditComponents = row
        .getAllCells()
        .filter((cell) => cell.column.columnDef.columnDefType === 'data')
        .map((cell) => (_jsx(MRT_EditCellTextInput, { cell: cell, table: table }, cell.id)));
    const handleCancel = () => {
        if (creatingRow) {
            onCreatingRowCancel?.({ row, table });
            setCreatingRow(null);
        }
        else {
            onEditingRowCancel?.({ row, table });
            setEditingRow(null);
        }
        row._valuesCache = {}; //reset values cache
        modalProps.onClose?.();
    };
    return (_createElement(Modal, { opened: open, withCloseButton: false, ...modalProps, key: row.id, onClose: handleCancel }, ((creatingRow &&
        renderCreateRowModalContent?.({
            internalEditComponents,
            row,
            table,
        })) ||
        renderEditRowModalContent?.({
            internalEditComponents,
            row,
            table,
        })) ?? (_jsxs(_Fragment, { children: [_jsx("form", { onSubmit: (e) => e.preventDefault(), children: _jsx(Stack, { gap: "lg", pb: 24, pt: 16, children: internalEditComponents }) }), _jsx(Flex, { justify: "flex-end", children: _jsx(MRT_EditActionButtons, { row: row, table: table, variant: "text" }) })] }))));
};
//# sourceMappingURL=MRT_EditRowModal.js.map