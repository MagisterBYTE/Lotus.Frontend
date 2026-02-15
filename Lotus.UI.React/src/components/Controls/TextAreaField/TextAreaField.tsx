import { Textarea, TextareaProps } from '@mantine/core';
import { FC, JSX } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ITextAreaFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  textAreaProps?: Omit<TextareaProps, keyof IBaseFieldProps>;
}

export const TextAreaField: FC<ITextAreaFieldProps> = (props: ITextAreaFieldProps): JSX.Element =>
{
  const { textAreaProps: textInputProps, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const textArea = (<Textarea
    error={otherProps.error}
    errorProps={otherProps.errorProps}
    h={undefined}
    inputWrapperOrder={['input', 'error']}
    resize="both"
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
        componentField={textArea}
      />
    );
  }
  else
  {
    return (
      <Textarea
        resize="both"
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
