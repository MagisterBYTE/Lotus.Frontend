import { InputLabel, Slider as MantineSlider, SliderProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { JSX } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';

type TValueType = PropertyType<SliderProps, 'value'>;
type TValueMax = PropertyType<SliderProps, 'max'>;
type TValueMin = PropertyType<SliderProps, 'min'>;
type TValueStep = PropertyType<SliderProps, 'step'>;
type TValueDefaultValue = PropertyType<SliderProps, 'defaultValue'>;

type TChangeFunction = PropertyType<SliderProps, 'onChange'>;

type TChangedValueFunction = (value: TValueType) => void;

export interface ISliderProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange' | 'defaultValue'>
{
  sliderProps?: Omit<SliderProps, keyof IBaseContainerControlProps | 'value' | 'min' | 'step' | 'value' | 'disabled' | 'onChange'>;
  value?: TValueType;
  max?: TValueMax;
  min?: TValueMin;
  step?: TValueStep;
  defaultValue?: TValueDefaultValue;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function Slider(props: ISliderProps): JSX.Element
{
  const { sliderProps, value, max, min, step, defaultValue, onChange, onChangeValue, disabled, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const handleChange = (value: number) =>
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
    return (
      <ContainerControl
        vAlign="center"
        {...otherProps}
        control={
          <MantineSlider
            defaultValue={defaultValue}
            disabled={disabled}
            h={undefined}
            max={max}
            min={min}
            size={otherProps.size}
            step={step}
            style={{ flex: 1, ...sliderProps?.style }}
            value={value}
            w={undefined}
            {...sliderProps}
            onChange={handleChange}
          />
        }
      />
    );
  }
  else
  {
    if (otherProps.label)
    {
      return (
        <VerticalStack hAlign="stretch" {...containerProps}>
          <InputLabel {...otherProps.labelProps} required={otherProps.required} size={otherProps.labelProps?.size ?? otherProps.size}>
            {otherProps.label}
          </InputLabel>
          <MantineSlider
            {...containerProps}
            defaultValue={defaultValue}
            max={max}
            min={min}
            size={otherProps.size}
            step={step}
            value={value}
            {...sliderProps}
          />
        </VerticalStack>
      );
    }
    else
    {
      return (
        <MantineSlider
          {...containerProps}
          defaultValue={defaultValue}
          disabled={disabled}
          max={max}
          min={min}
          size={otherProps.size}
          step={step}
          value={value}
          {...sliderProps}
          onChange={handleChange}
        />
      );
    }
  }
}
