import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TablePagination.module.css';
import { ActionIcon, Box, Group, Pagination, Select, Text, } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100].map((x) => x.toString());
export const MRT_TablePagination = ({ position = 'bottom', table, ...props }) => {
    const { getPrePaginationRowModel, getState, options: { enableToolbarInternalActions, icons: { IconChevronLeft, IconChevronLeftPipe, IconChevronRight, IconChevronRightPipe, }, localization, mantinePaginationProps, paginationDisplayMode, rowCount, }, setPageIndex, setPageSize, } = table;
    const { pagination: { pageIndex = 0, pageSize = 10 }, showGlobalFilter, } = getState();
    const paginationProps = {
        ...parseFromValuesOrFunc(mantinePaginationProps, {
            table,
        }),
        ...props,
    };
    const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
    const numberOfPages = Math.ceil(totalRowCount / pageSize);
    const showFirstLastPageButtons = numberOfPages > 2;
    const firstRowIndex = pageIndex * pageSize;
    const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);
    const { rowsPerPageOptions = defaultRowsPerPage, showRowsPerPage = true, withEdges = showFirstLastPageButtons, ...rest } = paginationProps ?? {};
    const needsTopMargin = position === 'top' && enableToolbarInternalActions && !showGlobalFilter;
    return (_jsxs(Box, { className: clsx('mrt-table-pagination', classes.root, needsTopMargin && classes['with-top-margin']), children: [paginationProps?.showRowsPerPage !== false && (_jsxs(Group, { gap: "xs", children: [_jsx(Text, { id: "rpp-label", children: localization.rowsPerPage }), _jsx(Select, { allowDeselect: false, "aria-labelledby": "rpp-label", className: classes.pagesize, data: paginationProps?.rowsPerPageOptions ?? defaultRowsPerPage, onChange: (value) => setPageSize(+value), value: pageSize.toString() })] })), paginationDisplayMode === 'pages' ? (_jsx(Pagination, { firstIcon: IconChevronLeftPipe, lastIcon: IconChevronRightPipe, nextIcon: IconChevronRight, onChange: (newPageIndex) => setPageIndex(newPageIndex - 1), previousIcon: IconChevronLeft, total: numberOfPages, value: pageIndex + 1, withEdges: withEdges, ...rest })) : paginationDisplayMode === 'default' ? (_jsxs(_Fragment, { children: [_jsx(Text, { children: `${lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()}-${lastRowIndex.toLocaleString()} ${localization.of} ${totalRowCount.toLocaleString()}` }), _jsxs(Group, { gap: 6, children: [withEdges && (_jsx(ActionIcon, { "aria-label": localization.goToFirstPage, color: "gray", disabled: pageIndex <= 0, onClick: () => setPageIndex(0), variant: "subtle", children: _jsx(IconChevronLeftPipe, {}) })), _jsx(ActionIcon, { "aria-label": localization.goToPreviousPage, color: "gray", disabled: pageIndex <= 0, onClick: () => setPageIndex(pageIndex - 1), variant: "subtle", children: _jsx(IconChevronLeft, {}) }), _jsx(ActionIcon, { "aria-label": localization.goToNextPage, color: "gray", disabled: lastRowIndex >= totalRowCount, onClick: () => setPageIndex(pageIndex + 1), variant: "subtle", children: _jsx(IconChevronRight, {}) }), withEdges && (_jsx(ActionIcon, { "aria-label": localization.goToLastPage, color: "gray", disabled: lastRowIndex >= totalRowCount, onClick: () => setPageIndex(numberOfPages - 1), variant: "subtle", children: _jsx(IconChevronRightPipe, {}) }))] })] })) : null] }));
};
//# sourceMappingURL=MRT_TablePagination.js.map