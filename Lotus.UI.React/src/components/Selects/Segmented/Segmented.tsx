import { InputLabel, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { PropertyType } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import { JSX, useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps, Primitive } from '#components/Common';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { IItemsBaseOneProps } from '../types';

export interface ISegmentedProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps {
  segmentedProps?: Omit<SegmentedControlProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
  useAccentSelection?: boolean;
}

type TSegmentedStyles = PropertyType<SegmentedControlProps, 'styles'>;

const styleContainerItem: IHorizontalStackProps = { hAlign: 'center' };

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
    useAccentSelection,
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

  const styles: TSegmentedStyles | undefined = useAccentSelection
    ? {
      // Индикатор (подложка, которая перемещается)
      indicator: {
        outline: `1px solid var(--mantine-color-${segmentedProps?.color ?? 'blue'}-filled)`,
        outlineOffset: '-1px', // Чтобы рамка была внутри и не обрезалась
        backgroundColor: `var(--mantine-color-${segmentedProps?.color ?? 'blue'}-light)` // Можно сделать легкий фон
      }
    }
    : undefined;

  if (useAccentSelection && segmentedProps) 
  {
    segmentedProps.color = undefined;
  }

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
            styles={styles}
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
