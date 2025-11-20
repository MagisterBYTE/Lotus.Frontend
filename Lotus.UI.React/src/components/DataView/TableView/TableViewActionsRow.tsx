import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core';
import { MRT_Cell, MRT_Row, MRT_TableInstance } from '#external/mantine-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IActionRowProps<TItem extends Record<string, any>>
{
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
    <ActionIcon size='large' onClick={() => { props.onEditRow(table, row) }}>
      <IconEdit />
    </ActionIcon>
  </Tooltip>)
}