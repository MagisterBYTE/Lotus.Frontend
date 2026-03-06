import { PasswordInput  as MantinePasswordInput, PasswordInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { ChangeEvent, JSX } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';

type TValueType = PropertyType<PasswordInputProps, 'value'>;

type TChangeFunction = PropertyType<PasswordInputProps, 'onChange'>;

type TChangedValueFunction = (value: string) => void;

export interface IPasswordInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'>
{
  passwordInputProps?: Omit<PasswordInputProps, keyof IBaseContainerControlProps | 'value' | 'disabled' | 'onChange'>;
  value?: TValueType;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function PasswordInput(props: IPasswordInputProps): JSX.Element
{
  const { passwordInputProps, value, onChange, onChangeValue, disabled, ...otherProps } = props;

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
    const passwordInput = (<MantinePasswordInput
      disabled={disabled}
      error={otherProps.error}
      errorProps={otherProps.errorProps}
      h={undefined}
      inputWrapperOrder={['input', 'error']}
      size={otherProps.size}
      style={{ flex: 1, ...passwordInputProps?.style }}
      value={value}
      w={undefined}
      {...passwordInputProps}
      onChange={handleChange}
    />);
  
    return (
      <ContainerControl
        {...otherProps}
        control={passwordInput}
      />
    );
  }
  else
  {
    return (
      <MantinePasswordInput
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
        {...passwordInputProps}
        onChange={handleChange}
      />
    );
  }
}
