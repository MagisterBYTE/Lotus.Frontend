import { CheckIcon, Combobox, ComboboxItem, ComboboxLikeRenderOptionInput, Group, SelectProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { PropertyType } from 'lotus-core/types';
import { JSX, useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { SelectEx } from '#components/Extendeds';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderItem, RenderOption } from '#render';
import { IContextRenderBase } from '#types';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';
import { IItemsBaseOneProps } from '../types';

type TSelectData = PropertyType<SelectProps, 'data'>;

export interface ISelectFieldProps<TItem> extends IBaseFieldProps, IItemsBaseOneProps<TItem>, IHorizontalStackProps
{
  selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function SelectField<TItem = unknown>(props: ISelectFieldProps<TItem>): JSX.Element 
{
  type ComboboxItemObject = ComboboxItem & { original: TItem };

  const {
    items,
    onChangedItem,
    selectedItem,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem = ItemsHelper.getLabelOfItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderItem,
    renderValue,
    selectProps,
    size,
    ...otherProps
  } = props;

  const [data, setData] = useState<TSelectData>([]);

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;

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

  const handleChange = (value: string | null, option: ComboboxItem) => 
  {
    const optionObject = option as ComboboxItemObject;

    if (onChangedItem) 
    {
      if (value === null) 
      {
        onChangedItem(undefined);
      }
      else
      {
        onChangedItem(optionObject.original);
      }
    }

    if (selectProps?.onChange) 
    {
      selectProps?.onChange(value, option);
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

  // { withBorder: true, p: 'xxs', bdRadius: 'md' }

  const renderInternalValue = (value: string, contextRender?: IContextRenderBase) => 
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
        return RenderItem.renderItem(size ?? 'md', item, undefined, {});
      }
      else
      {
        return <>{value}</>;
      }
    }
  };

  const actualRenderOption = (renderItem ? renderInternalOption : undefined);
  const actualRenderValue = (renderValue ? renderInternalValue : undefined);

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <SelectEx
            data={data}
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            h={undefined}
            inputWrapperOrder={['input', 'error']}
            renderOption={actualRenderOption}
            renderValue={actualRenderValue}
            size={size}
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
      <SelectEx
        {...containerProps}
        data={data}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        renderOption={actualRenderOption}
        renderValue={actualRenderValue}
        required={otherProps.required}
        size={size}
        value={selectedValue}
        onChange={handleChange}
        {...selectProps}
      />
    );
  }
}
