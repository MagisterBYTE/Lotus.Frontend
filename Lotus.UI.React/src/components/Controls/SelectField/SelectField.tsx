import { ComboboxItem, ComboboxLikeRenderOptionInput, Group, Select, SelectProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { IOption, OptionHelper } from 'lotus-core/modules/option';
import { PropertyType, TKey } from 'lotus-core/types';
import { JSX, useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderIcon, RenderOption } from '#render';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

type TSelectData = PropertyType<SelectProps, 'data'>;

export interface ISelectFieldProps<TValueOption extends TKey = TKey> extends IBaseFieldProps, IHorizontalStackProps
{
  options: IOption<TValueOption>[];
  onChanged?: (value: TValueOption | undefined) => void;
  value?: TValueOption;
  selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function SelectField<TValueOption extends TKey = TKey>(props: ISelectFieldProps<TValueOption>): JSX.Element
{
  const { options, onChanged, value, selectProps, ...otherProps } = props;

  const isNumber = OptionHelper.isNumber(options);

  const [selectedIcon, setSelectedIcon] = useState<unknown>(undefined);
  const [data, setData] = useState<TSelectData>([]);

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  useEffect(() =>
  {
    setData(OptionHelper.convertToString(options));
  }, [options, options.length, otherProps.size]);

  const handleChange = (value: string | null, option: ComboboxItem) =>
  {
    setSelectedIcon((option as IOption)?.icon);

    if (onChanged)
    {
      if (value === null)
      {
        onChanged(undefined);
      }
      if (isNumber)
      {
        onChanged(Number(value) as TValueOption);
      }
      else
      {
        onChanged(value as TValueOption);
      }
    }

    if (selectProps?.onChange)
    {
      selectProps?.onChange(value, option);
    }
  };

  const renderOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) =>
  {
    return (
      <Group flex="1" gap="xs">
        {RenderOption.renderOption(otherProps.size ?? 'md', (item.option as IOption))}
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
            value={value?.toString()}
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
        value={value?.toString()}
        onChange={handleChange}
        {...selectProps}
      />
    );
  }
}
