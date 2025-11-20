import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Flex, Tooltip } from '@mantine/core';
import { MRT_ExpandAllButton } from '../../components/buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../../components/buttons/MRT_ExpandButton';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';
export const getMRT_RowExpandColumnDef = (tableOptions) => {
    const { defaultColumn, enableExpandAll, groupedColumnMode, positionExpandColumn, renderDetailPanel, state: { grouping }, } = tableOptions;
    const alignProps = positionExpandColumn === 'last'
        ? {
            align: 'right',
        }
        : undefined;
    return {
        Cell: ({ cell, column, row, table }) => {
            const expandButtonProps = { row, table };
            const subRowsLength = row.subRows?.length;
            if (tableOptions.groupedColumnMode === 'remove' && row.groupingColumnId) {
                return (_jsxs(Flex, { align: "center", gap: "0.25rem", children: [_jsx(MRT_ExpandButton, { ...expandButtonProps }), _jsx(Tooltip, { label: table.getColumn(row.groupingColumnId).columnDef.header, openDelay: 1000, position: "right", children: _jsx("span", { children: row.groupingValue }) }), !!subRowsLength && _jsxs("span", { children: ["(", subRowsLength, ")"] })] }));
            }
            else {
                return (_jsxs(_Fragment, { children: [_jsx(MRT_ExpandButton, { ...expandButtonProps }), column.columnDef.GroupedCell?.({ cell, column, row, table })] }));
            }
        },
        Header: enableExpandAll
            ? ({ table }) => {
                return (_jsxs(Flex, { align: "center", children: [_jsx(MRT_ExpandAllButton, { table: table }), groupedColumnMode === 'remove' &&
                            grouping
                                ?.map((groupedColumnId) => table.getColumn(groupedColumnId).columnDef.header)
                                ?.join(', ')] }));
            }
            : undefined,
        mantineTableBodyCellProps: alignProps,
        mantineTableHeadCellProps: alignProps,
        ...defaultDisplayColumnProps({
            header: 'expand',
            id: 'mrt-row-expand',
            size: groupedColumnMode === 'remove'
                ? (defaultColumn?.size ?? 180)
                : renderDetailPanel
                    ? enableExpandAll
                        ? 60
                        : 70
                    : 100,
            tableOptions,
        }),
    };
};
//# sourceMappingURL=getMRT_RowExpandColumnDef.js.map