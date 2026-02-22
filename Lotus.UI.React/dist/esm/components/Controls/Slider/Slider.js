import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, Slider as MantineSlider } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
import { VerticalStack } from '#components/Layout';
export function Slider(props) {
    const { sliderProps, value, max, min, step, defaultValue, onChange, onChangeValue, disabled, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
        if (onChangeValue) {
            onChangeValue(value);
        }
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerControl, { vAlign: "center", ...otherProps, control: _jsx(MantineSlider, { defaultValue: defaultValue, disabled: disabled, h: undefined, max: max, min: min, size: otherProps.size, step: step, style: { flex: 1, ...sliderProps?.style }, value: value, w: undefined, ...sliderProps, onChange: handleChange }) }));
    }
    else {
        if (otherProps.label) {
            return (_jsxs(VerticalStack, { hAlign: "stretch", ...containerProps, children: [_jsx(InputLabel, { ...otherProps.labelProps, required: otherProps.required, size: otherProps.labelProps?.size ?? otherProps.size, children: otherProps.label }), _jsx(MantineSlider, { ...containerProps, defaultValue: defaultValue, max: max, min: min, size: otherProps.size, step: step, value: value, ...sliderProps })] }));
        }
        else {
            return (_jsx(MantineSlider, { ...containerProps, defaultValue: defaultValue, disabled: disabled, max: max, min: min, size: otherProps.size, step: step, value: value, ...sliderProps, onChange: handleChange }));
        }
    }
}
//# sourceMappingURL=Slider.js.map