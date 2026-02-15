import { CheckIcon, Combobox, ComboboxItem, ComboboxLikeRenderOptionInput, Group, MultiSelectProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { PropertyType } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import { JSX, useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { MultiSelectEx } from '#components/Extendeds';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderItem, RenderOption } from '#render';
import { IContextRenderBase } from '#types';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseMultiProps } from '../types';

type TMultiSelectData = PropertyType<MultiSelectProps, 'data'>;

export interface IMultiSelectFieldProps<TItem> extends IBaseFieldProps, IItemsBaseMultiProps<TItem>, IHorizontalStackProps
{
  selectProps?: Omit<MultiSelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function MultiSelectField<TItem = unknown>(props: IMultiSelectFieldProps<TItem>): JSX.Element 
{
  type ComboboxItemObject = ComboboxItem & { original: TItem };

  const {
    items,
    onChangedItems,
    selectedItems,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem = ItemsHelper.getLabelOfItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderItem,
    renderValue,
    selectProps,
    size,
    ...otherProps
  } = props;

  const [data, setData] = useState<TMultiSelectData>([]);

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValues = selectedItems ? selectedItems.map((x) => getValueItem(x).toString()) : undefined;

  const contextRender = { size: size, disabled: selectProps?.disabled } as IContextRenderBase;

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
  }, [items, items.length, size]);

  const handleChange = (value: string[]) => 
  {
    if (onChangedItems) 
    {
      if (Assert.emptyValue(value) || value.length === 0) 
      {
        onChangedItems([]);
      }
      else 
      {
        const selectedItems = ItemsHelper.getItemsByValues(items, value);
        onChangedItems(selectedItems);
      }
    }

    if (selectProps?.onChange) 
    {
      selectProps?.onChange(value);
    }
  };

  const renderInternalOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => 
  {
    const optionObject = item.option as ComboboxItemObject;

    if (typeof renderItem === 'function')
    {
      return renderItem(optionObject.original, contextRender);
    }
    else
    {
      const iconView = Boolean(selectProps?.withCheckIcon) && item.checked;
      const check = iconView ? (
        <CheckIcon className={Combobox.classes.optionsDropdownCheckIcon} />
      ) : selectProps?.withAlignedLabels ? (
        <div className={Combobox.classes.optionsDropdownCheckPlaceholder} />
      ) : undefined;

      const left = selectProps?.checkIconPosition === 'left' || selectProps?.checkIconPosition === undefined;
      const right = selectProps?.checkIconPosition === 'right';
      return (
        <Group flex="1" gap="xs">
          {left && check}
          {RenderOption.renderOption(size ?? 'md', optionObject.original as IOption)}
          {right && check}
        </Group>
      );
    }
  };

  const renderInternalPill = (value: string, contextRender?: IContextRenderBase) => 
  {
    const item = ItemsHelper.getItemByValueOrUndefined(items, value);
    if (typeof renderValue === 'function')
    {
      return renderValue(item, contextRender);
    }
    else
    {
      if (item)
      {
        return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
      }
      else
      {
        return <>{value}</>;
      }
    }
  };

  const actualRenderOption = (renderItem ? renderInternalOption : undefined);
  const actualRenderPill = (renderValue ? renderInternalPill : undefined);

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <MultiSelectEx
            data={data}
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            h={undefined}
            inputWrapperOrder={['input', 'error']}
            renderOption={actualRenderOption}
            renderPill={actualRenderPill}
            size={size}
            style={{ flex: 1 }}
            value={selectedValues}
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
      <MultiSelectEx
        {...containerProps}
        withAlignedLabels
        data={data}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        renderOption={actualRenderOption}
        renderPill={actualRenderPill}
        required={otherProps.required}
        size={size}
        value={selectedValues}
        onChange={handleChange}
        {...selectProps}
      />
    );
  }
}
