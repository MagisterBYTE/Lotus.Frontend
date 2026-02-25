import { ItemsHelper } from 'lotus-core';
import { IRecordObject, TKey } from 'lotus-core/types';
import { ReactNode } from 'react';
import { Primitive } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { TableViewComponentProps } from './TableViewComponentProps';

const styleContainerItem: IHorizontalStackProps = {};

export function TableViewSelectView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, row, cell, contextRender, imageDatabase } = props;

  const id = cell.getValue() as TKey;
  const items = property.possibleValues!;
  const item = ItemsHelper.getItemByValueOrUndefined(items, id);
  
  // Собственный режим отображения
  if (property.rendering && property.rendering.enabled)
  {
    return property.rendering.renderField(row.original, contextRender, item) as ReactNode;
  }
  else
  {
    const size = contextRender.size;
    return <Primitive.Item imageDatabase={imageDatabase} item={item} size={size} wrapContainer={styleContainerItem} />;
  }
}