import { IRecordObject } from 'lotus-core/types';
import { Text } from '#components/Display';
import { TableViewComponentProps } from './TableViewComponentProps';

export function TableViewTextView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, row, cell, contextRender } = props;
  if (property.rendering && property.rendering.enabled)
  {
    // Собственный режим отображения
    return <>{property.rendering.renderField(row.original, contextRender)}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Text fontSize={contextRender.size} {...property.visualSettings?.propsView}>{cell.getValue() as any}</Text>;
}