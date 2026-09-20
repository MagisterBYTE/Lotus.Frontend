import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { Collapse, Progress } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
import classes from './MRT_ProgressBar.module.css';
export const MRT_ProgressBar = ({ isTopToolbar, table, ...rest }) => {
    const { state, options: { mantineProgressProps }, } = table;
    const { isSaving, showProgressBars } = state;
    const linearProgressProps = {
        ...parseFromValuesOrFunc(mantineProgressProps, {
            isTopToolbar,
            table,
        }),
        ...rest,
    };
    return (_jsx(Collapse, { className: clsx(classes.collapse, isTopToolbar && classes['collapse-top']), expanded: isSaving || showProgressBars, children: _jsx(Progress, { animated: true, "aria-busy": "true", "aria-label": "Loading", radius: 0, value: 100, ...linearProgressProps }) }));
};
//# sourceMappingURL=MRT_ProgressBar.js.map