import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_ProgressBar.module.css';
import { Collapse, Progress } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_ProgressBar = ({ isTopToolbar, table, ...rest }) => {
    const { getState, options: { mantineProgressProps }, } = table;
    const { isSaving, showProgressBars } = getState();
    const linearProgressProps = {
        ...parseFromValuesOrFunc(mantineProgressProps, {
            isTopToolbar,
            table,
        }),
        ...rest,
    };
    return (_jsx(Collapse, { className: clsx(classes.collapse, isTopToolbar && classes['collapse-top']), in: isSaving || showProgressBars, children: _jsx(Progress, { animated: true, "aria-busy": "true", "aria-label": "Loading", radius: 0, value: 100, ...linearProgressProps }) }));
};
//# sourceMappingURL=MRT_ProgressBar.js.map