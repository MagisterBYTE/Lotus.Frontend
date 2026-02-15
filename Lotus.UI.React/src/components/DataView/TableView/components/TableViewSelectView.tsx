import { ItemsHelper } from 'lotus-core';
import { IRecordObject, TKey } from 'lotus-core/types';
import { RenderItem } from '#render';
import { TableViewComponentProps } from './TableViewComponentProps';

export function TableViewSelectView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, row, cell, contextRender } = props;
 
  // Собственный режим отображения
  if (property.rendering && property.rendering.enabled)
  {
    return property.rendering.renderField(row.original, contextRender);
  }
  else
  {
    const id = cell.getValue() as TKey;
    const items = property.possibleValues!;
    const item = ItemsHelper.getItemByValueOrUndefined(items, id);
    const size = contextRender.size ?? 'md';
    return RenderItem.renderItem(size, item, undefined, {});
  }
}