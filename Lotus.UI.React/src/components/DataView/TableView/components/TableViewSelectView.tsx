import { ItemsHelper } from 'lotus-core';
import { IRecordObject, TKey } from 'lotus-core/types';
import { Primitive } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';
import { TableViewComponentProps } from './TableViewComponentProps';

const styleContainerItem: IHorizontalStackProps = {};

export function TableViewSelectView<TItem extends IRecordObject>(props: TableViewComponentProps<TItem>)
{
  const { property, row, cell, contextRender, imageDatabase } = props;
 
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
    const size = contextRender.size;
    return <Primitive.Item imageDatabase={imageDatabase} item={item} size={size} wrapContainer={styleContainerItem} />;
  }
}