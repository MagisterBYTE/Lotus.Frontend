import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ToolbarInternalButtons.module.css';
import { Flex } from '@mantine/core';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleFullScreenButton } from '../buttons/MRT_ToggleFullScreenButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
export const MRT_ToolbarInternalButtons = ({ table, ...rest }) => {
    const { options: { columnFilterDisplayMode, enableColumnFilters, enableColumnOrdering, enableColumnPinning, enableDensityToggle, enableFilters, enableFullScreenToggle, enableGlobalFilter, enableHiding, initialState, renderToolbarInternalActions, }, } = table;
    return (_jsx(Flex, { ...rest, className: clsx('mrt-toolbar-internal-buttons', classes.root, rest?.className), children: renderToolbarInternalActions?.({ table }) ?? (_jsxs(_Fragment, { children: [enableFilters &&
                    enableGlobalFilter &&
                    !initialState?.showGlobalFilter && (_jsx(MRT_ToggleGlobalFilterButton, { table: table })), enableFilters &&
                    enableColumnFilters &&
                    columnFilterDisplayMode !== 'popover' && (_jsx(MRT_ToggleFiltersButton, { table: table })), (enableHiding || enableColumnOrdering || enableColumnPinning) && (_jsx(MRT_ShowHideColumnsButton, { table: table })), enableDensityToggle && (_jsx(MRT_ToggleDensePaddingButton, { table: table })), enableFullScreenToggle && (_jsx(MRT_ToggleFullScreenButton, { table: table }))] })) }));
};
//# sourceMappingURL=MRT_ToolbarInternalButtons.js.map