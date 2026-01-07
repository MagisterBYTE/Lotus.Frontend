import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, Slider } from '@mantine/core';
import { ContainerPropertiesHelper } from '#base';
import { VerticalStack } from '#components/Layout';
import { ContainerField } from '../ContainerField/ContainerField';
export function SliderField(props) {
    const { sliderProps, ...otherProps } = props;
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(Slider, { h: undefined, size: otherProps.size, style: { flex: 1 }, w: undefined, ...sliderProps }), vAlign: "center" }));
    }
    else {
        if (otherProps.label) {
            return (_jsxs(VerticalStack, { ...containerProps, hAlign: "stretch", children: [_jsx(InputLabel, { ...otherProps.labelProps, required: otherProps.required, size: otherProps.labelProps?.size ?? otherProps.size, children: otherProps.label }), _jsx(Slider, { ...containerProps, size: otherProps.size, ...sliderProps })] }));
        }
        else {
            return _jsx(Slider, { ...containerProps, size: otherProps.size, ...sliderProps });
        }
    }
}
//# sourceMappingURL=SliderField.js.map