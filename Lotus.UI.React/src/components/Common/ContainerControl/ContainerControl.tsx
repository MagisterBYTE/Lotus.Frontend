import { DataAttributes, InputDescription, InputDescriptionProps, InputErrorProps, InputLabel, InputLabelProps, Stack } from '@mantine/core';
import { Assert } from 'lotus-core/utils';
import { JSX } from 'react/jsx-runtime';
import { IGeneralBackgroundProperties, IGeneralContainerProperties } from '#base';
import { HorizontalStack, IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';

/**
 * Определение базовых данных для представления контрола в контейнере
 */
export interface IBaseContainerControlProps extends IGeneralContainerProperties, IGeneralBackgroundProperties
{
  /**
   * Режим размещения надписи и поля в одну строку
   */
  inlinePlace?: boolean;

  /**
   * Размер элемента
   */
  size?: TSizeType;

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

/**
 * Определение данных для представления контрола в горизонтальном контейнере
 */
export interface IContainerControlProps extends IBaseContainerControlProps, IHorizontalStackProps
{
  control: JSX.Element;
}

/**
 * Базовый компонент для представления контрола в горизонтальном контейнере
 */
export function ContainerControl(props: IContainerControlProps)
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, inlinePlace = false, size, required, label, labelProps, description, descriptionProps, error, errorProps, ...otherProps } = props;

  const vAlign = Assert.existValue(otherProps.vAlign) ? otherProps.vAlign : Assert.existValue(description) ? 'center' : 'baseline';
  const spacing = Assert.existValue(otherProps.spacing) ? otherProps.spacing : Assert.existValue(labelProps?.w) ? 'undefined' : (size ?? 'md');

  return (
    <HorizontalStack {...otherProps} spacing={spacing} vAlign={vAlign}>
      <Stack gap={0} justify="flex-start" w={labelProps?.w}>
        {label && (
          <InputLabel {...labelProps} required={required} size={labelProps?.size ?? size} style={{ ...labelProps?.style, whiteSpace: 'nowrap' }} w={undefined}>
            {label}
          </InputLabel>
        )}
        {description && (
          <InputDescription {...descriptionProps} size={descriptionProps?.size ?? size}>
            {description}
          </InputDescription>
        )}
      </Stack>
      {control}
    </HorizontalStack>
  );
}
