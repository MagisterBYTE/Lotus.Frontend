import { InputLabel, Slider, SliderProps } from '@mantine/core';
import { JSX } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ISliderFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  sliderProps?: Omit<SliderProps, keyof IBaseFieldProps>;
}

export function SliderField(props: ISliderFieldProps): JSX.Element
{
  const { sliderProps, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={<Slider h={undefined} size={otherProps.size} style={{ flex: 1 }} w={undefined} {...sliderProps} />}
        vAlign="center"
      />
    );
  }
  else
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
    }
    else
    {
      return <Slider {...containerProps} size={otherProps.size} {...sliderProps} />;
    }
  }
}
