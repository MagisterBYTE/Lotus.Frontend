import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, SegmentedControl } from '@mantine/core';
import { OptionHelper } from 'lotus-core/modules/option';
import { Assert } from 'lotus-core/utils';
import { useEffect, useState } from 'react';
import { getContainerProperties } from '#base';
import { VerticalStack } from '#components/Layout';
import { RenderOption } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function SegmentedField(props) {
    const { options, onChanged, value, segmentedProps, ...otherProps } = props;
    const isNumber = OptionHelper.isNumber(options);
    const [data, setData] = useState([]);
    const containerProps = getContainerProperties(otherProps);
    const prepareData = () => {
        const newData = [];
        for (const option of options) {
            newData.push({
                label: RenderOption.renderOption(otherProps.size ?? 'md', option, props, undefined, true),
                value: option.value.toString(),
                disabled: option.disabled
            });
        }
        setData(newData);
    };
    useEffect(() => {
        prepareData();
    }, [options, options.length, otherProps.size]);
    const handleChange = (value) => {
        if (onChanged) {
            if (Assert.emptyValue(value)) {
                onChanged(undefined);
            }
            if (isNumber) {
                onChanged(Number(value));
            }
            else {
                onChanged(value);
            }
        }
        if (segmentedProps?.onChange) {
            segmentedProps?.onChange(value);
        }
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(SegmentedControl, { data: data, h: undefined, size: otherProps.size, style: { flex: 1 }, value: value?.toString(), w: undefined, onChange: handleChange, ...segmentedProps }), vAlign: "center" }));
    }
    else {
        if (otherProps.label) {
            return (_jsxs(VerticalStack, { ...containerProps, hAlign: "stretch", children: [_jsx(InputLabel, { ...otherProps.labelProps, required: otherProps.required, size: otherProps.labelProps?.size ?? otherProps.size, children: otherProps.label }), _jsx(SegmentedControl, { ...containerProps, data: data, size: otherProps.size, value: value?.toString(), onChange: handleChange, ...segmentedProps })] }));
        }
        else {
            return _jsx(SegmentedControl, { ...containerProps, data: data, size: otherProps.size, value: value?.toString(), onChange: handleChange, ...segmentedProps });
        }
    }
}
//# sourceMappingURL=SegmentedField.js.map