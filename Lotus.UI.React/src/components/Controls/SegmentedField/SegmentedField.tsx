import { InputLabel, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { IOption, OptionHelper } from 'lotus-core/modules/option';
import { PropertyType, TKey } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import { JSX, useEffect, useState } from 'react';
import { getContainerProperties } from '#base';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { RenderOption } from '#render';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

type TSegmentedData = PropertyType<SegmentedControlProps, 'data'>;

export interface ISegmentedFieldProps<TValueOption extends TKey = TKey> extends IBaseFieldProps, IHorizontalStackProps
{
  options: IOption<TValueOption>[];
  onChanged?: (value: TValueOption | undefined) => void;
  value?: TValueOption;
  segmentedProps?: Omit<SegmentedControlProps, keyof IBaseFieldProps | 'data' | 'value'>;
}

export function SegmentedField<TValueOption extends TKey = TKey>(props: ISegmentedFieldProps<TValueOption>): JSX.Element
{
  const { options, onChanged, value, segmentedProps, ...otherProps } = props;

  const isNumber = OptionHelper.isNumber(options);

  const [data, setData] = useState<TSegmentedData>([]);

  const containerProps = getContainerProperties(otherProps);

  const prepareData = () =>
  {
    const newData: TSegmentedData = [];
    for (const option of options)
    {
      newData.push({
        label: RenderOption.renderOption(otherProps.size ?? 'md', option, props, undefined, true),
        value: option.value.toString(),
        disabled: option.disabled
      });
    }

    setData(newData);
  };

  useEffect(() =>
  {
    prepareData();
  }, [options, options.length, otherProps.size]);

  const handleChange = (value: string) =>
  {
    if (onChanged)
    {
      if (Assert.emptyValue(value))
      {
        onChanged(undefined);
      }
      if (isNumber)
      {
        onChanged(Number(value) as TValueOption);
      }
      else
      {
        onChanged(value as TValueOption);
      }
    }

    if (segmentedProps?.onChange)
    {
      segmentedProps?.onChange(value);
    }
  };

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <SegmentedControl
            data={data}
            h={undefined}
            size={otherProps.size}
            style={{ flex: 1 }}
            value={value?.toString()}
            w={undefined}
            onChange={handleChange}
            {...segmentedProps}
          />
        }
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
          <SegmentedControl {...containerProps} data={data} size={otherProps.size} value={value?.toString()} onChange={handleChange} {...segmentedProps} />
        </VerticalStack>
      );
    }
    else
    {
      return <SegmentedControl {...containerProps} data={data} size={otherProps.size} value={value?.toString()} onChange={handleChange} {...segmentedProps} />;
    }
  }
}
