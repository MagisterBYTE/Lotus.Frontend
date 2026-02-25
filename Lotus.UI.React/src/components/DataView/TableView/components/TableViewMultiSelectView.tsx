import { ItemsHelper } from 'lotus-core';
import { IRecordObject } from 'lotus-core/types';
import { ReactNode } from 'react';
import { Primitive } from '#components/Common';
import { HorizontalStack, IHorizontalStackProps } from '#components/Layout';
import { TSizeTypes } from '#types';
import { TableViewComponentProps } from './TableViewComponentProps';

export function TableViewMultiSelectView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, cell, row, contextRender, imageDatabase } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const massive = cell.getValue() as any[];
  const items = property.possibleValues!;
  const selectedItems = ItemsHelper.getItemsByValues(items, massive);

  if (property.rendering && property.rendering.enabled)
  {
    return property.rendering.renderField(row.original, contextRender, selectedItems) as ReactNode;
  }
  else
  {
    const size = contextRender.size ?? 'md';
    const styleContainerItem: IHorizontalStackProps = { withBorder: true, bdRadius: size, p: TSizeTypes.prev(size, 3) };
    return (
      <HorizontalStack wrap spacing={'md'}>
        {selectedItems.map((item, index) =>
        {
          // eslint-disable-next-line react/no-array-index-key
          return <Primitive.Item key={index} imageDatabase={imageDatabase} item={item} size={size} wrapContainer={styleContainerItem} />;
        })}
      </HorizontalStack>
    );
  }
}