import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_FilterCheckBox.module.css';
import { Checkbox, Tooltip } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_FilterCheckbox = ({ column, table, ...rest }) => {
    const { getState, options: { localization, mantineFilterCheckboxProps }, } = table;
    const { density } = getState();
    const { columnDef } = column;
    const arg = { column, table };
    const checkboxProps = {
        ...parseFromValuesOrFunc(mantineFilterCheckboxProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineFilterCheckboxProps, arg),
        ...rest,
    };
    const filterLabel = localization.filterByColumn?.replace('{column}', columnDef.header);
    const value = column.getFilterValue();
    return (_jsx(Tooltip, { label: checkboxProps?.title ?? filterLabel, openDelay: 1000, withinPortal: true, children: _jsx(Checkbox, { checked: value === 'true', className: clsx('mrt-filter-checkbox', classes.root), indeterminate: value === undefined, label: checkboxProps.title ?? filterLabel, size: density === 'xs' ? 'sm' : 'md', ...checkboxProps, onChange: (e) => {
                column.setFilterValue(column.getFilterValue() === undefined
                    ? 'true'
                    : column.getFilterValue() === 'true'
                        ? 'false'
                        : undefined);
                checkboxProps?.onChange?.(e);
            }, onClick: (e) => {
                e.stopPropagation();
                checkboxProps?.onClick?.(e);
            }, title: undefined }) }));
};
//# sourceMappingURL=MRT_FilterCheckbox.js.map