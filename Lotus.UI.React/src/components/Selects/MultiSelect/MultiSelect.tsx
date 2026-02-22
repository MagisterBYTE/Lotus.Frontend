import { CheckIcon, Combobox, ComboboxItem, ComboboxLikeRenderOptionInput, Group, MultiSelectProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { IOption } from 'lotus-core/modules/option';
import { Assert } from 'lotus-core/utils';
import { JSX, useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { MultiSelectEx } from '#components/Extendeds';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderItem, RenderOption } from '#render';
import { IContextRenderBase } from '#types';
import { IItemsBaseMultiProps } from '../types';

export interface IMultiSelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseMultiProps<TItem>, IHorizontalStackProps {
  selectProps?: Omit<MultiSelectProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
}

export function MultiSelect<TItem = unknown>(props: IMultiSelectProps<TItem>): JSX.Element 
{
  type ComboboxItemObject = ComboboxItem & { original: TItem };

  const {
    items,
    onChangedItems,
    selectedItems,
    imageDatabase,
    selectRenderComponent,
    getValueItem = ItemsHelper.getValueOfItem,
    getLabelItem = ItemsHelper.getLabelOfItem,
    getDisabledItem = ItemsHelper.getDisabledOfItem,
    renderItem,
    renderValue,
    selectProps,
    size,
    ...otherProps
  } = props;

  const data = useMemo(
    () =>
      items.map((item) => ({
        label: getLabelItem(item),
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        original: item
      })),
    [items, getLabelItem, getValueItem, getDisabledItem]
  );

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const selectedValues = useMemo(() => selectedItems?.map((x) => getValueItem(x).toString()), [selectedItems, getValueItem]);

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

  // #region Render
  const renderOptionContent = (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => 
  {
    const option = input.option as ComboboxItemObject;
    const isSelected = input.checked;
    
    const context: IContextRenderBase = { size, disabled: selectProps?.disabled, selected: isSelected };

    let content: React.ReactNode;
    if (typeof renderItem === 'function') 
    {
      content = renderItem(option.original, context);
    }
    else 
    {
      content = RenderOption.renderOption(size ?? 'md', option.original as IOption, imageDatabase);
    }

    // Если не нужен враппер с чекбоксом
    if (!selectRenderComponent && typeof renderItem === 'function') return content;

    const isRight = selectProps?.checkIconPosition === 'right';
    const showCheck = selectProps?.withCheckIcon && isSelected;
    
    const checkIcon = showCheck ? (
      <CheckIcon className={Combobox.classes.optionsDropdownCheckIcon} />
    ) : selectProps?.withAlignedLabels ? (
      <div className={Combobox.classes.optionsDropdownCheckPlaceholder} />
    ) : null;

    return (
      <Group flex="1" gap="xs" wrap="nowrap">
        {!isRight && checkIcon}
        {content}
        {isRight && checkIcon}
      </Group>
    );
  };

  const renderPillContent = (value: string) => 
  {
    const item = ItemsHelper.getItemByValueOrUndefined(items, value);
    if (typeof renderValue === 'function') return renderValue(item, { size });
    
    return item 
      ? RenderItem.renderItem(size ?? 'md', item, imageDatabase, { withBorder: true, p: 'xxs', bdRadius: 'md' }) 
      : value;
  };

  const actualRenderOption = useMemo(() => (renderItem ? renderOptionContent : undefined), [renderItem, size, selectProps, imageDatabase, selectRenderComponent]);
  const actualRenderPill = useMemo(() => (renderValue ? renderPillContent : undefined), [renderValue, items, size, imageDatabase]);
  // #endregion

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerControl
        {...otherProps}
        control={
          <MultiSelectEx
            data={data}
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            h={undefined}
            inputWrapperOrder={['input', 'error']}
            renderOption={actualRenderOption}
            renderPill={actualRenderPill}
            size={size}
            style={{ flex: 1, ...selectProps?.style }}
            value={selectedValues}
            w={undefined}
            onChange={handleChange}
            {...selectProps}
          />
        }
        size={size}
        vAlign={otherProps.vAlign ?? ((Assert.emptyValue(otherProps.error) && Assert.emptyValue(otherProps.description)) ? 'center' : undefined)}
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
