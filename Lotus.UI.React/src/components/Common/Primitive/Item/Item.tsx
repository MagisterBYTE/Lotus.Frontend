import { OptionHelper } from 'lotus-core/modules/option';
import { memo } from 'react';
import { IOptionProps, Option } from '../Option';

export interface IItemProps extends Omit<IOptionProps, 'option'> {
  /**
   * Элементе
   */
  item: unknown;
}

export const Item = memo((props: IItemProps) => 
{
  if (OptionHelper.instanceOfOption(props.item))
  {
    return <Option {...props} option={props.item} />;
  }
    
  return <></>;
});

// Назначаем имя для отладки в DevTools
Item.displayName = 'Item';
