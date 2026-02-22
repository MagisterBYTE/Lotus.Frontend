import { NumberInput as MantineNumberInput, NumberInputProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';

type TValueType = PropertyType<NumberInputProps, 'value'>;
type TValueMax = PropertyType<NumberInputProps, 'max'>;
type TValueMin = PropertyType<NumberInputProps, 'min'>;
type TValueStep = PropertyType<NumberInputProps, 'step'>;
type TValueDefaultValue = PropertyType<NumberInputProps, 'defaultValue'>;

type TChangeFunction = PropertyType<NumberInputProps, 'onChange'>;

type TChangedValueFunction = (value: TValueType) => void;

export interface INumberInputProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'>
{
  numberInputProps?: Omit<NumberInputProps, keyof IBaseContainerControlProps | 'value' | 'min' | 'step' | 'value' | 'disabled' | 'onChange'>;
  value?: TValueType;
  max?: TValueMax;
  min?: TValueMin;
  step?: TValueStep;
  defaultValue?: TValueDefaultValue;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function NumberInput(props: INumberInputProps)
{
  const { numberInputProps, value, max, min, step, defaultValue, onChange, onChangeValue, disabled, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const handleChange = (value: string | number) =>
  {
    if (onChange)
    {
      onChange(value);
    }
    if (onChangeValue)
    {
      onChangeValue(value);
    }
  };

  if (otherProps.inlinePlace)
  {
    const numberInput = (
      <MantineNumberInput
        defaultValue={defaultValue}
        disabled={disabled}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        h={undefined}
        inputWrapperOrder={['input', 'error']}
        max={max}
        min={min}
        size={otherProps.size}
        step={step}
        style={{ flex: 1, ...numberInputProps?.style }}
        value={value}
        w={undefined}
        {...numberInputProps}
        onChange={handleChange}
      />
    );

    return <ContainerControl {...otherProps} control={numberInput} />;
  }
  else
  {
    return (
      <MantineNumberInput
        {...containerProps}
        defaultValue={defaultValue}
        description={otherProps.description}
        descriptionProps={otherProps.descriptionProps}
        disabled={disabled}
        error={otherProps.error}
        errorProps={otherProps.errorProps}
        label={otherProps.label}
        labelProps={otherProps.labelProps}
        max={max}
        min={min}
        required={otherProps.required}
        size={otherProps.size}
        step={step}
        value={value}
        {...numberInputProps}
        onChange={handleChange}
      />
    );
  }
}
