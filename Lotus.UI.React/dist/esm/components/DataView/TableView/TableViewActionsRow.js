import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditActionRow = (props) => {
    const { table, row } = props;
    return (_jsx(Tooltip, { label: LocalizationCore.data.actions.edit, children: _jsx(ActionIcon, { size: 'large', onClick: () => { props.onEditRow(table, row); }, children: _jsx(IconEdit, {}) }) }));
};
//# sourceMappingURL=TableViewActionsRow.js.map