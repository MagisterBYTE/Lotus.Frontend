import { CSSProperties, Switch, SwitchProps } from '@mantine/core';
import { getContainerProperties } from '#base';
import { IHorizontalStackProps } from '#components/Layout';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';

export interface ISwitchFieldProps extends IBaseFieldProps, IHorizontalStackProps
{
  switchProps?: Omit<SwitchProps, keyof IBaseFieldProps>;
}

export function SwitchField(props: ISwitchFieldProps)
{
  const { switchProps, ...otherProps } = props;

  const containerProps = getContainerProperties(otherProps);

  // Создаем обработанные пропсы для Switch
  const processedSwitchProps = {
    ...switchProps,
    style: typeof switchProps?.style === 'function'
      ? switchProps.style
      : { flex: (switchProps?.style as CSSProperties)?.flex ?? 1, ...switchProps?.style }
  };

  if (otherProps.inlinePlace)
  {
    return (
      <ContainerField
        {...otherProps}
        componentField={
          <Switch
            {...processedSwitchProps}
            error={otherProps.error}
            h={switchProps?.height}
            size={otherProps.size}
            w={switchProps?.width}
          />
        }
        vAlign='center'
      />
    );
  }
  else
  {
    return (
      <Switch
        {...containerProps}
        description={otherProps.description}
        error={otherProps.error}
        label={otherProps.label}
        required={otherProps.required}
        size={otherProps.size}
        {...switchProps}
      />
    );
  }
}
