import { getContainerProperties } from '#base';
import { IHorizontalStackProps, VerticalStack } from '#components/Layout';
import { RenderOption } from '#render';
import { InputLabel, SegmentedControl, SegmentedControlProps } from '@mantine/core';
import { IOption } from 'lotus-core/modules/option';
import { PropertyType, TKey } from 'lotus-core/types';
import { JSX, useEffect, useState } from 'react';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ISegmentedFieldProps<TValueOption extends TKey = TKey> extends IBaseFieldProps, IHorizontalStackProps
{
  options: IOption<TValueOption>[];
  segmentedProps?: Omit<SegmentedControlProps, keyof IBaseFieldProps | 'data'>;
}

export function SegmentedField(props: ISegmentedFieldProps): JSX.Element
{
  const { options, segmentedProps, ...otherProps } = props;

  type TSegmentedData = PropertyType<SegmentedControlProps, 'data'>;

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
  }, [options, otherProps.size]);

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        vAlign="center"
        componentField={<SegmentedControl w={undefined} h={undefined} size={otherProps.size} style={{ flex: 1 }} data={data} {...segmentedProps} />}/>
    );
  } else
  {
    if (otherProps.label)
    {
      return (
        <VerticalStack {...containerProps} hAlign='stretch'>
          <InputLabel {...otherProps.labelProps} required={otherProps.required} size={otherProps.labelProps?.size ?? otherProps.size}>
            {otherProps.label}
          </InputLabel>
          <SegmentedControl {...containerProps} size={otherProps.size} data={data} {...segmentedProps} />
        </VerticalStack>
      )
    } else
    {
      return <SegmentedControl {...containerProps} size={otherProps.size} data={data} {...segmentedProps} />
    }
  }
}
