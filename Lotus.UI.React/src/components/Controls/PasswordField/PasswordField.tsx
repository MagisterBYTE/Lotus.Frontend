import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { FC, JSX } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface IPasswordFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  passwordInputProps?: Omit<PasswordInputProps, keyof IBaseFieldProps>;
}

export const PasswordField: FC<IPasswordFieldProps> = (props: IPasswordFieldProps): JSX.Element =>
{
  const { passwordInputProps: textInputProps, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const passwordInput = (<PasswordInput
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
        componentField={passwordInput}
      />
    );
  }
  else
  {
    return (
      <PasswordInput
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
