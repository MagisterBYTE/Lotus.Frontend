import { getContainerProperties } from '#base';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { InputLabel, Slider, SliderProps } from '@mantine/core';
import { JSX } from 'react';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ISliderFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  sliderProps?: Omit<SliderProps, keyof IBaseFieldProps>;
}

export function SliderField(props: ISliderFieldProps): JSX.Element
{
  const { sliderProps, ...otherProps } = props;

  const containerProps = getContainerProperties(otherProps);

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        vAlign="center"
        componentField={<Slider w={undefined} h={undefined} size={otherProps.size} style={{ flex: 1 }} {...sliderProps} />}
      ></ContainerField>
    );
  } else
  {
    if (otherProps.label)
    {
      return (
        <VerticalStack {...containerProps} hAlign="stretch">
          <InputLabel {...otherProps.labelProps} required={otherProps.required} size={otherProps.labelProps?.size ?? otherProps.size}>
            {otherProps.label}
          </InputLabel>
          <Slider {...containerProps} size={otherProps.size} {...sliderProps} />
        </VerticalStack>
      );
    } else
    {
      return <Slider {...containerProps} size={otherProps.size} {...sliderProps} />;
    }
  }
}
