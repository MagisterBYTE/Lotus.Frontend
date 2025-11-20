import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_CopyButton.module.css';
import { CopyButton, Tooltip, UnstyledButton, } from '@mantine/core';
import { parseFromValuesOrFunc } from '../../utils/utils';
export const MRT_CopyButton = ({ cell, children, table, ...rest }) => {
    const { options: { localization: { clickToCopy, copiedToClipboard }, mantineCopyButtonProps, }, } = table;
    const { column, row } = cell;
    const { columnDef } = column;
    const arg = { cell, column, row, table };
    const buttonProps = {
        ...parseFromValuesOrFunc(mantineCopyButtonProps, arg),
        ...parseFromValuesOrFunc(columnDef.mantineCopyButtonProps, arg),
        ...rest,
    };
    return (_jsx(CopyButton, { value: cell.getValue(), children: ({ copied, copy }) => (_jsx(Tooltip, { color: copied ? 'green' : undefined, label: buttonProps?.title ?? (copied ? copiedToClipboard : clickToCopy), openDelay: 1000, withinPortal: true, children: _jsx(UnstyledButton, { ...buttonProps, className: clsx('mrt-copy-button', classes.root, buttonProps?.className), onClick: (e) => {
                    e.stopPropagation();
                    copy();
                }, role: "presentation", title: undefined, children: children }) })) }));
};
//# sourceMappingURL=MRT_CopyButton.js.map