import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TableHeadCellSortLabel.module.css';
import { ActionIcon, Indicator, Tooltip, } from '@mantine/core';
import { dataVariable } from '../../utils/style.utils';
export const MRT_TableHeadCellSortLabel = ({ header, table, ...rest }) => {
    const { getState, options: { icons: { IconArrowsSort, IconSortAscending, IconSortDescending }, localization, }, } = table;
    const column = header.column;
    const { columnDef } = column;
    const { sorting } = getState();
    const sorted = column.getIsSorted();
    const sortIndex = column.getSortIndex();
    const sortTooltip = sorted
        ? sorted === 'desc'
            ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
            : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
        : column.getNextSortingOrder() === 'desc'
            ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
            : localization.sortByColumnAsc.replace('{column}', columnDef.header);
    const SortActionButton = (_jsx(ActionIcon, { "aria-label": sortTooltip, ...dataVariable('sorted', sorted), ...rest, className: clsx('mrt-table-head-sort-button', classes['sort-icon'], rest.className), children: sorted === 'desc' ? (_jsx(IconSortDescending, { size: "100%" })) : sorted === 'asc' ? (_jsx(IconSortAscending, { size: "100%" })) : (_jsx(IconArrowsSort, { size: "100%" })) }));
    return (_jsx(Tooltip, { label: sortTooltip, openDelay: 1000, withinPortal: true, children: sorting.length < 2 || sortIndex === -1 ? (SortActionButton) : (_jsx(Indicator, { classNames: {
                root: clsx('mrt-table-head-multi-sort-indicator', classes['multi-sort-indicator']),
            }, inline: true, label: sortIndex + 1, offset: 4, children: SortActionButton })) }));
};
//# sourceMappingURL=MRT_TableHeadCellSortLabel.js.map