import { InputLabel, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { JSX, useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps, Primitive } from '#components/Common';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { IItemsBaseOneProps } from '../types';

export interface ISegmentedProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps
{
  segmentedProps?: Omit<SegmentedControlProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
}

const styleContainerItem: IHorizontalStackProps = { style: { padding: '0.25rem' } };

export function Segmented<TItem = unknown>(props: ISegmentedProps<TItem>): JSX.Element
{
  const {
    items,
    onChangedItem,
    selectedItem,
    imageDatabase,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderItem,
    segmentedProps,
    size,
    ...otherProps
  } = props;

  const data = useMemo(
    () =>
      items.map((item) => ({
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        label:
          typeof renderItem === 'function' ? (
            renderItem(item)
          ) : getLabelItem ? (
            getLabelItem(item)
          ) : (
            <Primitive.Item imageDatabase={imageDatabase} item={item} size={size} wrapContainer={styleContainerItem} />
          )
      })),
    [items, size, renderItem, getLabelItem, getValueItem, getDisabledItem]
  );

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;

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
      <ContainerControl
        {...otherProps}
        control={
          <SegmentedControl
            data={data}
            h={undefined}
            size={size}
            style={{ flex: 1, ...segmentedProps?.style }}
            value={selectedValue}
            w={undefined}
            onChange={handleChange}
            {...segmentedProps}
          />
        }
        size={size}
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
          <InputLabel
            {...otherProps.labelProps}
            ml={otherProps.labelProps?.ml ?? 'var(--mantine-spacing-sm)'}
            required={otherProps.required}
            size={otherProps.labelProps?.size ?? size}
          >
            {otherProps.label}
          </InputLabel>
          <SegmentedControl {...containerProps} data={data} size={size} value={selectedValue} onChange={handleChange} {...segmentedProps} />
        </VerticalStack>
      );
    }
    else
    {
      return <SegmentedControl {...containerProps} data={data} size={size} value={selectedValue} onChange={handleChange} {...segmentedProps} />;
    }
  }
}
