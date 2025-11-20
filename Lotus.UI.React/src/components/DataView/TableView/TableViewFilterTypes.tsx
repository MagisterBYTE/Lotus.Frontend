import { MenuItem } from '@mantine/core';
import { LocalizationCore } from 'lotus-core';
import { MRT_FilterOption } from '#external/mantine-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterString = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='stringContains'
      onClick={() => { onSelectFilterMode('contains'); column.filterFn = 'contains' }}>
      {LocalizationCore.data.filters.contains}
    </MenuItem>,
    <MenuItem
      key='stringEquals'
      onClick={() => onSelectFilterMode('equals')}>
      {LocalizationCore.data.filters.equals}
    </MenuItem>,
    <MenuItem
      key='stringStartsWith'
      onClick={() => onSelectFilterMode('startsWith')}>
      {LocalizationCore.data.filters.startsWith}
    </MenuItem>,
    <MenuItem
      key='stringEndsWith'
      onClick={() => onSelectFilterMode('endsWith')}>
      {LocalizationCore.data.filters.endsWith}
    </MenuItem>,
    <MenuItem
      key='stringNotEquals'
      onClick={() => onSelectFilterMode('notEquals')}>
      {LocalizationCore.data.filters.notEqual}
    </MenuItem>,
    <MenuItem
      key='stringNotEmpty'
      onClick={() => onSelectFilterMode('notEmpty')}>
      {LocalizationCore.data.filters.notEmpty}
    </MenuItem>]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterEnum = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='equals'
      onClick={() => { onSelectFilterMode('equals'); }}>
      {LocalizationCore.data.filters.equals}
    </MenuItem>,
    <MenuItem
      key='notEquals'
      onClick={() => { onSelectFilterMode('notEquals'); }}>
      {LocalizationCore.data.filters.notEqual}
    </MenuItem>]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditTableFilterArray = (column: any, onSelectFilterMode: (filterMode: MRT_FilterOption) => void): React.ReactNode[] =>
{
  return [
    <MenuItem
      key='includeAny'
      onClick={() => { onSelectFilterMode('includeAny'); }}>
      {LocalizationCore.data.filters.includeAny}
    </MenuItem>,
    <MenuItem
      key='includeAll'
      onClick={() => { onSelectFilterMode('includeAll'); }}>
      {LocalizationCore.data.filters.includeAll}
    </MenuItem>,
    <MenuItem
      key='includeEquals'
      onClick={() => { onSelectFilterMode('includeEquals'); }}>
      {LocalizationCore.data.filters.includeEquals}
    </MenuItem>,
    <MenuItem
      key='includeNone'
      onClick={() => { onSelectFilterMode('includeNone'); }}>
      {LocalizationCore.data.filters.includeNone}
    </MenuItem>]
} 
