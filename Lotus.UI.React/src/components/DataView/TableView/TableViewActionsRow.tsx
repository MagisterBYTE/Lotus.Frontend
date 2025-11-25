/* eslint-disable react/destructuring-assignment */
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core';
import React from 'react';
import { MRT_Cell, MRT_Row, MRT_TableInstance } from '#external/mantine-react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IActionRowProps<TItem extends Record<string, any>>
{
  // eslint-disable-next-line react/no-unused-prop-types
  cell: MRT_Cell<TItem>;
  table: MRT_TableInstance<TItem>;
  row: MRT_Row<TItem>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IEditActionRowProps<TItem extends Record<string, any>> extends IActionRowProps<TItem>
{
  onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditActionRow = <TItem extends Record<string, any>>(props: IEditActionRowProps<TItem>): React.ReactNode =>
{
  const { table, row } = props;

  return (<Tooltip label={LocalizationCore.data.actions.edit}>
    <ActionIcon size='large' onClick={() => { props.onEditRow(table, row); }}>
      <IconEdit />
    </ActionIcon>
  </Tooltip>);
};