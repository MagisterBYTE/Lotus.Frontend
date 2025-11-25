import { jsx as _jsx } from "react/jsx-runtime";
import { Switch } from '@mantine/core';
import { getContainerProperties } from '#base';
import { ContainerField } from '../ContainerField/ContainerField';
export function SwitchField(props) {
    const { switchProps, ...otherProps } = props;
    const containerProps = getContainerProperties(otherProps);
    // Создаем обработанные пропсы для Switch
    const processedSwitchProps = {
        ...switchProps,
        style: typeof switchProps?.style === 'function'
            ? switchProps.style
            : { flex: switchProps?.style?.flex ?? 1, ...switchProps?.style }
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(Switch, { ...processedSwitchProps, error: otherProps.error, h: switchProps?.height, size: otherProps.size, w: switchProps?.width }), vAlign: 'center' }));
    }
    else {
        return (_jsx(Switch, { ...containerProps, description: otherProps.description, error: otherProps.error, label: otherProps.label, required: otherProps.required, size: otherProps.size, ...switchProps }));
    }
}
//# sourceMappingURL=SwitchField.js.map