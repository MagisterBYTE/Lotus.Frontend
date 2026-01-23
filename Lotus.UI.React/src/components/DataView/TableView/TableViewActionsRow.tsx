/* eslint-disable react/destructuring-assignment */
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { IRecordObject } from 'lotus-core/types';
import React from 'react';
import { MRT_Cell, MRT_Row, MRT_TableInstance } from '#external/mantine-react-table';

export interface IActionRowProps<TItem extends IRecordObject>
{
  // eslint-disable-next-line react/no-unused-prop-types
  cell: MRT_Cell<TItem>;
  table: MRT_TableInstance<TItem>;
  row: MRT_Row<TItem>;
}

export interface IEditActionRowProps<TItem extends IRecordObject> extends IActionRowProps<TItem>
{
  onEditRow: (table: MRT_TableInstance<TItem>, row: MRT_Row<TItem>) => void;
}

export const EditActionRow = <TItem extends IRecordObject>(props: IEditActionRowProps<TItem>): React.ReactNode =>
{
  const { table, row } = props;

  return (<Tooltip label={LocalizationCore.data.actions.edit}>
    <ActionIcon size='large' onClick={() => { props.onEditRow(table, row); }}>
      <IconEdit />
    </ActionIcon>
  </Tooltip>);
};