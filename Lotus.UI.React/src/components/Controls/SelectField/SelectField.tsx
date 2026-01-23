import { ComboboxItem, ComboboxLikeRenderOptionInput, Group, Select, SelectProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { ItemsHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { PropertyType } from 'lotus-core/types';
import { JSX, useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderIcon, RenderOption } from '#render';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseProps } from '../types';

type TSelectData = PropertyType<SelectProps, 'data'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComboboxItemObject = ComboboxItem & {original: any};

export interface ISelectFieldProps<TItem> extends IBaseFieldProps, IItemsBaseProps<TItem>, IHorizontalStackProps {
  selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function SelectField<TItem = unknown>(props: ISelectFieldProps<TItem>): JSX.Element 
{
  const {
    items,
    onChangedItem,
    selectedItem,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem = ItemsHelper.getLabelOfItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    selectProps,
    ...otherProps
  } = props;

  const [selectedIcon, setSelectedIcon] = useState<unknown>(undefined);
  const [data, setData] = useState<TSelectData>([]);

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;

  const prepareData = () =>
  {
    const newData: ComboboxItemObject[] = [];
    for (const item of items)
    {
      newData.push({
        label: getLabelItem(item),
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        original: item
      });
    }

    setData(newData);
  };

  useEffect(() => 
  {
    prepareData();
  }, [items, items.length, otherProps.size]);

  const handleChange = (value: string | null, option: ComboboxItem) => 
  {
    const optionObject = option as ComboboxItemObject;

    setSelectedIcon((optionObject.original as IOption)?.icon);

    if (onChangedItem) 
    {
      if (value === null) 
      {
        onChangedItem(undefined);
      }
      else
      {
        onChangedItem(optionObject.original as TItem);
      }
    }

    if (selectProps?.onChange) 
    {
      selectProps?.onChange(value, option);
    }
  };

  const renderOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => 
  {
    const optionObject = item.option as ComboboxItemObject;
    return (
      <Group flex="1" gap="xs">
        {RenderOption.renderOption(otherProps.size ?? 'md', optionObject.original as IOption)}
        {item.checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
      </Group>
    );
  };

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <Select
            data={data}
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            h={undefined}
            inputWrapperOrder={['input', 'error']}
            leftSection={RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon)}
            renderOption={renderOption}
            size={otherProps.size}
            style={{ flex: 1 }}
            value={selectedValue}
            w={undefined}
            onChange={handleChange}
            {...selectProps}
          />
        }
      />
    );
  }
  else 
  {
    return (
      <Select
        {...containerProps}
        data={data}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        leftSection={RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon)}
        renderOption={renderOption}
        required={otherProps.required}
        size={otherProps.size}
        value={selectedValue}
        onChange={handleChange}
        {...selectProps}
      />
    );
  }
}
