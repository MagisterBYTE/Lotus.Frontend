import { Textarea, TextareaProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { ChangeEvent } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';

type TValueType = PropertyType<TextareaProps, 'value'>;

type TChangeFunction = PropertyType<TextareaProps, 'onChange'>;

type TChangedValueFunction = (value: string) => void;

export interface ITextAreaInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'>
{
  textAreaProps?: Omit<TextareaProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
  value?: TValueType;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function TextAreaInput(props: ITextAreaInputProps)
{
  const { textAreaProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
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
    const textArea = (
      <Textarea
        disabled={disabled}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        h={undefined}
        inputWrapperOrder={['input', 'error']}
        size={otherProps.size}
        style={{ flex: 1, ...textAreaProps?.style }}
        value={value}
        w={undefined}
        {...textAreaProps}
        onChange={handleChange}
      />
    );

    return <ContainerControl {...otherProps} control={textArea} />;
  }
  else
  {
    return (
      <Textarea
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
        {...textAreaProps}
        onChange={handleChange}
      />
    );
  }
}
