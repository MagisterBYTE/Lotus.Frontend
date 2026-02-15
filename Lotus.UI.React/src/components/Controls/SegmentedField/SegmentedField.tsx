import { InputLabel, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { PropertyType } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import { JSX, useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { RenderItem } from '#render';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseOneProps } from '../types';

type TSegmentedData = PropertyType<SegmentedControlProps, 'data'>;

export interface ISegmentedFieldProps<TItem> extends IBaseFieldProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps {
  segmentedProps?: Omit<SegmentedControlProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function SegmentedField<TItem = unknown>(props: ISegmentedFieldProps<TItem>): JSX.Element 
{
  const {
    items,
    onChangedItem,
    selectedItem,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderItem,
    segmentedProps,
    ...otherProps
  } = props;

  const [data, setData] = useState<TSegmentedData>([]);

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;

  const prepareData = () => 
  {
    const newData: TSegmentedData = [];
    for (const item of items) 
    {
      newData.push({
        label: Assert.isFunction(renderItem)
          ? renderItem(item)
          : getLabelItem
            ? getLabelItem(item)
            : RenderItem.renderItem(otherProps.size ?? 'md', item, undefined, {}),
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item)
      });
    }

    setData(newData);
  };

  useEffect(() => 
  {
    prepareData();
  }, [items, items.length, otherProps.size]);

  const handleChange = (value: string) => 
  {
    if (onChangedItem) 
    {
      if (Assert.emptyValue(value)) 
      {
        onChangedItem(undefined);
      }
      else 
      {
        for (const item of items) 
        {
          if (getValueItem(item).toString() === value) 
          {
            onChangedItem(item);
            break;
          }
        }
      }
    }

    if (segmentedProps?.onChange) 
    {
      segmentedProps?.onChange(value);
    }
  };

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <SegmentedControl
            data={data}
            h={undefined}
            size={otherProps.size}
            style={{ flex: 1 }}
            value={selectedValue}
            w={undefined}
            onChange={handleChange}
            {...segmentedProps}
          />
        }
        vAlign="center"
      />
    );
  }
  else 
  {
    if (otherProps.label) 
    {
      return (
        <VerticalStack {...containerProps} hAlign="stretch">
          <InputLabel {...otherProps.labelProps} required={otherProps.required} size={otherProps.labelProps?.size ?? otherProps.size}>
            {otherProps.label}
          </InputLabel>
          <SegmentedControl {...containerProps} data={data} size={otherProps.size} value={selectedValue} onChange={handleChange} {...segmentedProps} />
        </VerticalStack>
      );
    }
    else 
    {
      return <SegmentedControl {...containerProps} data={data} size={otherProps.size} value={selectedValue} onChange={handleChange} {...segmentedProps} />;
    }
  }
}
