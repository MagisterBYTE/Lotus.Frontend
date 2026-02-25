import { IRecordObject } from 'lotus-core/types';
import { ReactNode } from 'react';
import { Text } from '#components/Display';
import { TableViewComponentProps } from './TableViewComponentProps';

export function TableViewTextView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, cell, row, contextRender } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actualValue = cell.getValue() as any;

  if (property.rendering && property.rendering.enabled)
  {
    // Собственный режим отображения
    return property.rendering.renderField(row.original, contextRender, actualValue) as ReactNode;
  }

  return <Text fontSize={contextRender.size} {...property.visualSettings?.propsView}>{actualValue}</Text>;
}