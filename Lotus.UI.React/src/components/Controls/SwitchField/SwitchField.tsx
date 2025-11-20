import { CSSProperties, Switch, SwitchProps } from '@mantine/core';
import { ContainerField, IBaseFieldProps } from '../ContainerField/ContainerField';
import { IHorizontalStackProps } from '#components/Layout';
import { getContainerProperties } from '#base';

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
        vAlign='center'
        componentField={
          <Switch
            {...processedSwitchProps}
            error={otherProps.error}
            w={switchProps?.width}
            h={switchProps?.height}
            size={otherProps.size}
          />
        }
      ></ContainerField>
    );
  } else
  {
    return (
      <Switch
        {...containerProps}
        size={otherProps.size}
        required={otherProps.required}
        label={otherProps.label}
        description={otherProps.description}
        error={otherProps.error}
        {...switchProps}
      />
    );
  }
}
