import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_TablePaper.module.css';
import { Paper } from '@mantine/core';
import { MRT_TableContainer } from './MRT_TableContainer';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
export const MRT_TablePaper = ({ table, specificTableBody, ...rest }) => {
    const { getState, options: { enableBottomToolbar, enableTopToolbar, mantinePaperProps, renderBottomToolbar, renderTopToolbar, }, refs: { tablePaperRef }, } = table;
    const { isFullScreen } = getState();
    const tablePaperProps = {
        ...parseFromValuesOrFunc(mantinePaperProps, { table }),
        ...rest,
    };
    return (_jsxs(Paper, { shadow: "xs", withBorder: true, ...tablePaperProps, className: clsx('mrt-table-paper', classes.root, isFullScreen && 'mrt-table-paper-fullscreen', tablePaperProps?.className), ref: (ref) => {
            tablePaperRef.current = ref;
            if (tablePaperProps?.ref) {
                tablePaperProps.ref.current = ref;
            }
        }, 
        // rare case where we should use inline styles to guarantee highest specificity
        style: (theme) => ({
            zIndex: isFullScreen ? 200 : undefined,
            ...parseFromValuesOrFunc(tablePaperProps?.style, theme),
            ...(isFullScreen
                ? {
                    border: 0,
                    borderRadius: 0,
                    bottom: 0,
                    height: '100vh',
                    left: 0,
                    margin: 0,
                    maxHeight: '100vh',
                    maxWidth: '100vw',
                    padding: 0,
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    width: '100vw',
                }
                : null),
        }), children: [enableTopToolbar &&
                (parseFromValuesOrFunc(renderTopToolbar, { table }) ?? (_jsx(MRT_TopToolbar, { table: table }))), _jsx(MRT_TableContainer, { table: table, specificTableBody: specificTableBody }), enableBottomToolbar &&
                (parseFromValuesOrFunc(renderBottomToolbar, { table }) ?? (_jsx(MRT_BottomToolbar, { table: table })))] }));
};
//# sourceMappingURL=MRT_TablePaper.js.map