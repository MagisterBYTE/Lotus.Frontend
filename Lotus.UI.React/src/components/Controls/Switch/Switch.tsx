import { Switch as MantineSwitch, SwitchProps } from '@mantine/core';
import { PropertyType } from 'lotus-core/types';
import { ChangeEvent } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, IBaseContainerControlProps } from '#components/Common';
import { IHorizontalStackProps } from '#components/Layout';

type TValueType = PropertyType<SwitchProps, 'checked'>;

type TChangeFunction = PropertyType<SwitchProps, 'onChange'>;

type TChangedValueFunction = (value: TValueType) => void;

export interface ISwitchProps extends IBaseContainerControlProps, Omit<IHorizontalStackProps, 'onChange'> {
  switchProps?: Omit<SwitchProps, keyof IBaseContainerControlProps | 'checked' | 'disabled' | 'onChange'>;
  checked?: TValueType;
  onChange?: TChangeFunction;
  onChangeValue?: TChangedValueFunction;
  disabled?: boolean;
}

export function Switch(props: ISwitchProps) 
{
  const { switchProps, checked, onChange, onChangeValue, disabled, ...otherProps } = props;

  const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => 
  {
    if (onChange) 
    {
      onChange(event);
    }
    if (onChangeValue) 
    {
      onChangeValue(event.target.checked);
    }
  };

  if (otherProps.inlinePlace) 
  {
    return (
      <ContainerControl
        vAlign="center"
        {...otherProps}
        control={
          <MantineSwitch
            checked={checked}
            disabled={disabled}
            error={otherProps.error}
            h={switchProps?.height}
            size={otherProps.size}
            style={{ flex: 1, ...switchProps?.style }}
            w={switchProps?.width}
            {...switchProps}
            onChange={handleChange}
          />
        }
      />
    );
  }
  else 
  {
    return (
      <MantineSwitch
        {...containerProps}
        checked={checked}
        description={otherProps.description}
        disabled={disabled}
        error={otherProps.error}
        label={otherProps.label}
        required={otherProps.required}
        size={otherProps.size}
        {...switchProps}
        onChange={handleChange}
      />
    );
  }
}
