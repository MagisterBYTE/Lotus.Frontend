import { CheckIcon, Combobox, ComboboxItem, ComboboxLikeRenderOptionInput, Group, SelectProps } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { JSX, useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps, Primitive } from '#components/Common';
import { SelectEx } from '#components/Extendeds';
import { IHorizontalStackProps } from '#components/Layout';
import { IContextRenderBase } from '#types';
import { IItemsBaseOneProps } from '../types';

export interface ISelectProps<TItem> extends IBaseContainerControlProps, IItemsBaseOneProps<TItem>, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'> {
  selectProps?: Omit<SelectProps, keyof IBaseContainerControlProps | 'data' | 'value'>;
}

export function Select<TItem = unknown>(props: ISelectProps<TItem>): JSX.Element 
{
  type ComboboxItemObject = ComboboxItem & { original: TItem };

  const {
    items,
    onChangedItem,
    selectedItem,
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

  const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;

  const handleChange = (value: string | null, option: ComboboxItem) => 
  {
    const original = (option as ComboboxItemObject)?.original;
    onChangedItem?.(value === null ? undefined : original);
    selectProps?.onChange?.(value, option);
  };

  // #region Render
  const renderOptionContent = (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => 
  {
    const { option, checked } = input;
    const itemObject = option as ComboboxItemObject;

    // 1. Подготавливаем данные для рендера
    const currentContext: IContextRenderBase = {
      size,
      disabled: option.disabled,
      selected: checked
    };

    // 2. Получаем основной контент (кастомный или дефолтный)
    let content: React.ReactNode;
    if (typeof renderItem === 'function') 
    {
      content = renderItem(itemObject.original, currentContext);
    }
    else 
    {
      content = <Primitive.Item imageDatabase={imageDatabase} item={itemObject.original} size={size} />;
    }

    // 3. Если не нужно рисовать обертку с иконкой — просто возвращаем контент
    if (!selectRenderComponent && typeof renderItem === 'function') 
    {
      return content;
    }

    // 4. Логика иконки чекбокса (Mantine-style)
    const isRight = selectProps?.checkIconPosition === 'right';
    const showCheck = selectProps?.withCheckIcon && checked;

    const checkIcon = showCheck ? (
      <CheckIcon className={Combobox.classes.optionsDropdownCheckIcon} />
    ) : selectProps?.withAlignedLabels ? (
      <div className={Combobox.classes.optionsDropdownCheckPlaceholder} />
    ) : null;

    // 5. Собираем финальную группу
    return (
      <Group flex="1" gap="xs" wrap="nowrap">
        {!isRight && checkIcon}
        {content}
        {isRight && checkIcon}
      </Group>
    );
  };

  const renderSelectedValue = (val: string) => 
  {
    const item = ItemsHelper.getItemByValueOrUndefined(items, val);

    // Если есть кастомная функция рендера значения
    if (typeof renderValue === 'function') 
    {
      return renderValue(item, { size });
    }

    // Иначе дефолтный рендер элемента или просто текст
    if (item) 
    {
      return <Primitive.Item imageDatabase={imageDatabase} item={item} size={size} wrapContainer={{}} />;
    }

    return val;
  };

  const actualRenderOption = useMemo(() => (renderItem ? renderOptionContent : undefined), [renderItem, items, size, selectProps]);
  const actualRenderValue = useMemo(() => (renderValue ? renderSelectedValue : undefined), [renderValue, items, size]);
  // #endregion

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerControl
        {...otherProps}
        control={
          <SelectEx
            data={data}
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            h={undefined}
            inputWrapperOrder={['input', 'error']}
            renderOption={actualRenderOption}
            renderValue={actualRenderValue}
            size={size}
            style={{ flex: 1, ...selectProps?.style }}
            value={selectedValue}
            w={undefined}
            onChange={handleChange}
            {...selectProps}
          />
        }
        size={size}
        vAlign={otherProps.vAlign ?? (Assert.emptyValue(otherProps.error) && Assert.emptyValue(otherProps.description) ? 'center' : undefined)}
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
