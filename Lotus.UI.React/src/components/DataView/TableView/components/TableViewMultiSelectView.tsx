import { ItemsHelper } from 'lotus-core';
import { IRecordObject } from 'lotus-core/types';
import { HorizontalStack } from '#components/Layout';
import { RenderItem } from '#render';
import { TSizeTypes } from '#types';
import { TableViewComponentProps } from './TableViewComponentProps';

export function TableViewMultiSelectView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, cell, row, contextRender } = props;
  if (property.rendering && property.rendering.enabled)
  {
    return <>{property.rendering.renderField(row.original, contextRender)}</>;
  }
  else
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const massive = cell.getValue() as any[];
    const items = property.possibleValues!;
    const selectedItems = ItemsHelper.getItemsByValues(items, massive);
    const size = contextRender.size ?? 'md';
    return (
      <HorizontalStack wrap spacing={'md'}>
        {selectedItems.map((x) =>
        {
          return RenderItem.renderItem(size, x, undefined, { withBorder: true, bdRadius: size, p: TSizeTypes.prev(size, 3) });
        })}
      </HorizontalStack>
    );
  }
}