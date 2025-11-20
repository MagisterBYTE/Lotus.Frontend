import { getContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { TextInput, TextInputProps } from '@mantine/core';
import { JSX } from 'react';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ITextFieldProps extends IBaseFieldProps, IHorizontalStackProps {
  textInputProps?: Omit<TextInputProps, keyof IBaseFieldProps>;
}

export function TextField(props: ITextFieldProps): JSX.Element {
  const { textInputProps, ...otherProps } = props;
  const containerProps = getContainerProperties(otherProps);

  if (otherProps.inlinePlace) {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <TextInput
            error={otherProps.error}
            errorProps={otherProps.errorProps}
            w={undefined}
            h={undefined}
            size={otherProps.size}
            style={{ flex: 1 }}
            inputWrapperOrder={['input', 'error']}
            {...textInputProps}
          />
        }
      ></ContainerField>
    );
  } else {
    return (
      <TextInput
        {...containerProps}
        size={otherProps.size}
        required={otherProps.required}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        {...textInputProps}
      />
    );
  }
}
