import { getContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { RenderIcon, RenderOption } from '#render';
import { ComboboxItem, ComboboxLikeRenderOptionInput, Group, Select, SelectProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { IOption } from 'lotus-core/modules/option';
import { PropertyType } from 'lotus-core/types';
import { JSX, useState } from 'react';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ISelectFieldProps extends IBaseFieldProps, IHorizontalStackProps {
  data: PropertyType<SelectProps, 'data'>;
  selectProps?: Omit<SelectProps, keyof IBaseFieldProps | 'data'>;
}

export function SelectField(props: ISelectFieldProps): JSX.Element {
  const { data, selectProps, ...otherProps } = props;

  const [selectedIcon, setSelectedIcon] = useState<any>(undefined);

  const containerProps = getContainerProperties(otherProps);

  const handleChange = (value: string | null, option: ComboboxItem) => {
    setSelectedIcon((option as IOption)?.icon);
    if (selectProps?.onChange) {
      selectProps?.onChange(value, option);
    }
  };

  const renderOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
    return (
      <Group flex="1" gap="xs">
        {RenderOption.renderOption(otherProps.size ?? 'md', (item.option as IOption))}
        {item.checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
      </Group>
    );
  };

  if (otherProps.inlinePlace) {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <Select
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            w={undefined}
            h={undefined}
            size={otherProps.size}
            style={{ flex: 1 }}
            renderOption={renderOption}
            leftSection={RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon)}
            onChange={handleChange}
            inputWrapperOrder={['input', 'error']}
            data={data}
            {...selectProps}
          />
        }
      ></ContainerField>
    );
  } else {
    return (
      <Select
        {...containerProps}
        size={otherProps.size}
        required={otherProps.required}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        data={data}
        renderOption={renderOption}
        leftSection={RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon)}
        onChange={handleChange}
        {...selectProps}
      />
    );
  }
}
