import { jsx as _jsx } from "react/jsx-runtime";
import { NumberInput as MantineNumberInput } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
export function NumberInput(props) {
    const { numberInputProps, value, max, min, step, defaultValue, onChange, onChangeValue, disabled, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
        if (onChangeValue) {
            onChangeValue(Number(value));
        }
    };
    if (otherProps.inlinePlace) {
        const numberInput = (_jsx(MantineNumberInput, { defaultValue: defaultValue, disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], max: max, min: min, size: otherProps.size, step: step, style: { flex: 1, ...numberInputProps?.style }, value: value, w: undefined, ...numberInputProps, onChange: handleChange }));
        return _jsx(ContainerControl, { ...otherProps, control: numberInput });
    }
    else {
        return (_jsx(MantineNumberInput, { ...containerProps, defaultValue: defaultValue, description: otherProps.description, descriptionProps: otherProps.descriptionProps, disabled: disabled, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, max: max, min: min, required: otherProps.required, size: otherProps.size, step: step, value: value, ...numberInputProps, onChange: handleChange }));
    }
}
//# sourceMappingURL=NumberInput.js.map