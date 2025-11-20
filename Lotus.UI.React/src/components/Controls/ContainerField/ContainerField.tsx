import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { HorizontalStack, IHorizontalStackProps } from '#components/Layout';
import { TElementSize } from '#types';
import { DataAttributes, InputDescription, InputDescriptionProps, InputErrorProps, InputLabel, InputLabelProps, Stack } from '@mantine/core';
import { Assert } from 'lotus-core/utils';
import { JSX } from 'react/jsx-runtime';

/**
 * Базовый компонент для представления поля для ввода и управления различными данными
 */
export interface IBaseFieldProps extends IGeneralContainerProperties, IGeneralBackgroundProperties {
  /**
   * Режим размещения надписи и поля в одну строку
   */
  inlinePlace?: boolean;

  /**
   * Размер элемента
   */
  size?: TElementSize;

  /**
   * Статус обязательности поля
   */
  required?: boolean;

  /**
   * Компонент надписи
   */
  label?: React.ReactNode;

  /**
   * Настройки надписи
   */
  labelProps?: InputLabelProps & DataAttributes;

  /**
   * Компонент описания
   */
  description?: React.ReactNode;

  /**
   * Настройки описания
   */
  descriptionProps?: InputDescriptionProps & DataAttributes;

  /**
   * Компонент для отображения ошибки
   */
  error?: React.ReactNode;

  /**
   * Настройки компонента ошибок
   */
  errorProps?: InputErrorProps & DataAttributes;
}

export interface IContainerFieldProps extends IBaseFieldProps, IHorizontalStackProps {
  componentField: JSX.Element;
}

export function ContainerField(props: IContainerFieldProps) {
  const { componentField, inlinePlace = false, size, required, label, labelProps, description, descriptionProps, error, errorProps, ...otherProps } = props;

  const vAlign = Assert.existValue(otherProps.vAlign) ? otherProps.vAlign : Assert.existValue(description) ? 'center' : 'baseline';
  const spacing = Assert.existValue(otherProps.spacing) ? otherProps.spacing : Assert.existValue(labelProps?.w) ? 'undefined' : (size ?? 'md');

  return (
    <HorizontalStack {...otherProps} vAlign={vAlign} spacing={spacing}>
      <Stack justify="flex-start" gap={0} w={labelProps?.w}>
        {label && (
          <InputLabel {...labelProps} required={required} w={undefined} size={labelProps?.size ?? size}>
            {label}
          </InputLabel>
        )}
        {description && (
          <InputDescription {...descriptionProps} size={descriptionProps?.size ?? size}>
            {description}
          </InputDescription>
        )}
      </Stack>
      {componentField}
    </HorizontalStack>
  );
}
