import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { ChangeEvent } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';

type TValueType = PropertyType<TextInputProps, 'value'>;

type TChangeFunction = PropertyType<TextInputProps, 'onChange'>;

type TChangedValueFunction = (value: string) => void;

export interface ITextInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'>
{
  textInputProps?: Omit<TextInputProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
  value?: TValueType;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function TextInput(props: ITextInputProps) 
{
  const { textInputProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => 
  {
    if (onChange) 
    {
      onChange(event);
    }
    if (onChangeValue) 
    {
      onChangeValue(event.target.value);
    }
  };

  if (otherProps.inlinePlace) 
  {
    const textInput = (
      <MantineTextInput
        disabled={disabled}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        h={undefined}
        inputWrapperOrder={['input', 'error']}
        size={otherProps.size}
        style={{ flex: 1, ...textInputProps?.style }}
        value={value}
        w={undefined}
        {...textInputProps}
        onChange={handleChange}
      />
    );

    return <ContainerControl {...otherProps} control={textInput} />;
  }
  else 
  {
    return (
      <MantineTextInput
        {...containerProps}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        disabled={disabled}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        required={otherProps.required}
        size={otherProps.size}
        value={value}
        {...textInputProps}
        onChange={handleChange}
      />
    );
  }
}
