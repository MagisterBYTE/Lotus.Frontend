import { jsx as _jsx } from "react/jsx-runtime";
import { Switch as MantineSwitch } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
export function Switch(props) {
    const { switchProps, checked, onChange, onChangeValue, disabled, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
        }
        if (onChangeValue) {
            onChangeValue(event.target.checked);
        }
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerControl, { vAlign: "center", ...otherProps, control: _jsx(MantineSwitch, { checked: checked, disabled: disabled, error: otherProps.error, h: switchProps?.height, size: otherProps.size, style: { flex: 1, ...switchProps?.style }, w: switchProps?.width, ...switchProps, onChange: handleChange }) }));
    }
    else {
        return (_jsx(MantineSwitch, { ...containerProps, checked: checked, description: otherProps.description, disabled: disabled, error: otherProps.error, label: otherProps.label, required: otherProps.required, size: otherProps.size, ...switchProps, onChange: handleChange }));
    }
}
//# sourceMappingURL=Switch.js.map