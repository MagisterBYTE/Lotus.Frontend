import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { MultiSelect, Select, TextInput, } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_EditCellTextInput = ({ cell, table, ...rest }) => {
    const { getState, options: { createDisplayMode, editDisplayMode, mantineEditSelectProps, mantineEditTextInputProps, }, refs: { editInputRefs }, setCreatingRow, setEditingCell, setEditingRow, } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const { creatingRow, editingRow } = getState();
    const isCreating = creatingRow?.id === row.id;
    const isEditing = editingRow?.id === row.id;
    const isSelectEdit = columnDef.editVariant === 'select';
    const isMultiSelectEdit = columnDef.editVariant === 'multi-select';
    const [value, setValue] = useState(() => cell.getValue());
    const arg = { cell, column, row, table };
    const textInputProps = {
        ...parseFromValuesOrFunc(mantineEditTextInputProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineEditTextInputProps, arg),
        ...rest,
    };
    const selectProps = {
        ...parseFromValuesOrFunc(mantineEditSelectProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineEditSelectProps, arg),
        ...rest,
    };
    const saveInputValueToRowCache = (newValue) => {
        //@ts-ignore
        row._valuesCache[column.id] = newValue;
        if (isCreating) {
            setCreatingRow(row);
        }
        else if (isEditing) {
            setEditingRow(row);
        }
    };
    const handleBlur = (event) => {
        textInputProps.onBlur?.(event);
        saveInputValueToRowCache(value);
        setEditingCell(null);
    };
    const handleEnterKeyDown = (event) => {
        textInputProps.onKeyDown?.(event);
        if (event.key === 'Enter') {
            editInputRefs.current[cell.id]?.blur();
        }
    };
    if (columnDef.Edit) {
        return columnDef.Edit?.({ cell, column, row, table });
    }
    const commonProps = {
        disabled: parseFromValuesOrFunc(columnDef.enableEditing, row) === false,
        label: ['custom', 'modal'].includes((isCreating ? createDisplayMode : editDisplayMode))
            ? column.columnDef.header
            : undefined,
        name: cell.id,
        onClick: (e) => {
            e.stopPropagation();
            textInputProps?.onClick?.(e);
        },
        placeholder: !['custom', 'modal'].includes((isCreating ? createDisplayMode : editDisplayMode))
            ? columnDef.header
            : undefined,
        value,
        variant: editDisplayMode === 'table' ? 'unstyled' : 'default',
    };
    if (isSelectEdit) {
        return (_jsx(Select, { ...commonProps, searchable: true, value: value, ...selectProps, onBlur: handleBlur, onChange: (value, option) => {
                selectProps.onChange?.(value, option);
                setValue(value);
            }, onClick: (e) => {
                e.stopPropagation();
                selectProps?.onClick?.(e);
            }, ref: (node) => {
                if (node) {
                    editInputRefs.current[cell.id] = node;
                    if (selectProps.ref) {
                        selectProps.ref.current = node;
                    }
                }
            } }));
    }
    if (isMultiSelectEdit) {
        return (_jsx(MultiSelect, { ...commonProps, searchable: true, value: value, ...selectProps, onBlur: handleBlur, onChange: (newValue) => {
                selectProps.onChange?.(value);
                setValue(newValue);
                // Save if not in focus, otherwise it will be handled by onBlur
                if (document.activeElement === editInputRefs.current[cell.id])
                    return;
                saveInputValueToRowCache(newValue);
            }, onClick: (e) => {
                e.stopPropagation();
                selectProps?.onClick?.(e);
            }, ref: (node) => {
                if (node) {
                    editInputRefs.current[cell.id] = node;
                    if (selectProps.ref) {
                        selectProps.ref.current = node;
                    }
                }
            } }));
    }
    return (_jsx(TextInput, { ...commonProps, onKeyDown: handleEnterKeyDown, value: value ?? '', ...textInputProps, onBlur: handleBlur, onChange: (event) => {
            textInputProps.onChange?.(event);
            setValue(event.target.value);
        }, onClick: (event) => {
            event.stopPropagation();
            textInputProps?.onClick?.(event);
        }, ref: (node) => {
            if (node) {
                editInputRefs.current[cell.id] = node;
                if (textInputProps.ref) {
                    textInputProps.ref.current = node;
                }
            }
        } }));
};
//# sourceMappingURL=MRT_EditCellTextInput.js.map