import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_FilterRangeFields.module.css';
import { Box } from '@mantine/core';
import { MRT_FilterTextInput } from './MRT_FilterTextInput';
export const MRT_FilterRangeFields = ({ header, table, ...rest }) => {
    return (_jsxs(Box, { ...rest, className: clsx('mrt-filter-range-fields', classes.root, rest.className), children: [_jsx(MRT_FilterTextInput, { header: header, rangeFilterIndex: 0, table: table }), _jsx(MRT_FilterTextInput, { header: header, rangeFilterIndex: 1, table: table })] }));
};
//# sourceMappingURL=MRT_FilterRangeFields.js.map