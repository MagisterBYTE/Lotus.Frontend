import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox, Radio, Switch, Tooltip, } from '@mantine/core';
import { getIsRowSelected, getMRT_RowSelectionHandler, getMRT_SelectAllHandler, } from '../../utils/row.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_SelectCheckbox = ({ renderedRowIndex = 0, row, table, ...rest }) => {
    const { getState, options: { enableMultiRowSelection, localization, mantineSelectAllCheckboxProps, mantineSelectCheckboxProps, selectAllMode, selectDisplayMode, }, } = table;
    const { density, isLoading } = getState();
    const selectAll = !row;
    const allRowsSelected = selectAll
        ? selectAllMode === 'page'
            ? table.getIsAllPageRowsSelected()
            : table.getIsAllRowsSelected()
        : undefined;
    const isChecked = selectAll
        ? allRowsSelected
        : getIsRowSelected({ row, table });
    const checkboxProps = {
        ...(selectAll
            ? parseFromValuesOrFunc(mantineSelectAllCheckboxProps, { table })
            : parseFromValuesOrFunc(mantineSelectCheckboxProps, {
                row,
                table,
            })),
        ...rest,
    };
    const onSelectionChange = row
        ? getMRT_RowSelectionHandler({
            renderedRowIndex,
            row,
            table,
        })
        : undefined;
    const onSelectAllChange = getMRT_SelectAllHandler({ table });
    const commonProps = {
        'aria-label': selectAll
            ? localization.toggleSelectAll
            : localization.toggleSelectRow,
        checked: isChecked,
        disabled: isLoading || (row && !row.getCanSelect()) || row?.id === 'mrt-row-create',
        onChange: (event) => {
            event.stopPropagation();
            if (selectAll) {
                onSelectAllChange(event);
            }
            else {
                onSelectionChange(event);
            }
        },
        size: density === 'xs' ? 'sm' : 'md',
        ...checkboxProps,
        onClick: (e) => {
            e.stopPropagation();
            checkboxProps?.onClick?.(e);
        },
        title: undefined,
    };
    return (_jsx(Tooltip, { label: checkboxProps?.title ??
            (selectAll
                ? localization.toggleSelectAll
                : localization.toggleSelectRow), openDelay: 1000, withinPortal: true, children: _jsx("span", { children: selectDisplayMode === 'switch' ? (_jsx(Switch, { ...commonProps })) : selectDisplayMode === 'radio' ||
                enableMultiRowSelection === false ? (_jsx(Radio, { ...commonProps })) : (_jsx(Checkbox, { indeterminate: !isChecked && selectAll
                    ? table.getIsSomeRowsSelected()
                    : row?.getIsSomeSelected() && row.getCanSelectSubRows(), ...commonProps })) }) }));
};
//# sourceMappingURL=MRT_SelectCheckbox.js.map