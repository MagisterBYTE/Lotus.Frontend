import { TextInput, TextInputProps } from '@mantine/core';
import { FC, JSX } from 'react';
import { getContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ITextFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  textInputProps?: Omit<TextInputProps, keyof IBaseFieldProps>;
}

export const TextField: FC<ITextFieldProps> = (props: ITextFieldProps): JSX.Element =>
{
  const { textInputProps, ...otherProps } = props;

  const containerProps = getContainerProperties(otherProps);

  const textInput = (<TextInput
    error={otherProps.error}
    errorProps={otherProps.errorProps}
    h={undefined}
    inputWrapperOrder={['input', 'error']}
    size={otherProps.size}
    style={{ flex: 1 }}
    w={undefined}
    {...textInputProps}
  />);

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={textInput}
      />
    );
  }
  else
  {
    return (
      <TextInput
        {...containerProps}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        required={otherProps.required}
        size={otherProps.size}
        {...textInputProps}
      />
    );
  }
};
