import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Group, Select } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { OptionHelper } from 'lotus-core/modules/option';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { RenderIcon, RenderOption } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function SelectField(props) {
    const { options, onChanged, value, selectProps, ...otherProps } = props;
    const isNumber = OptionHelper.isNumber(options);
    const [selectedIcon, setSelectedIcon] = useState(undefined);
    const [data, setData] = useState([]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    useEffect(() => {
        setData(OptionHelper.convertToString(options));
    }, [options, options.length, otherProps.size]);
    const handleChange = (value, option) => {
        setSelectedIcon(option?.icon);
        if (onChanged) {
            if (value === null) {
                onChanged(undefined);
            }
            if (isNumber) {
                onChanged(Number(value));
            }
            else {
                onChanged(value);
            }
        }
        if (selectProps?.onChange) {
            selectProps?.onChange(value, option);
        }
    };
    const renderOption = (item) => {
        return (_jsxs(Group, { flex: "1", gap: "xs", children: [RenderOption.renderOption(otherProps.size ?? 'md', item.option), item.checked && _jsx(IconCheck, { style: { marginInlineStart: 'auto' } })] }));
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(Select, { data: data, error: otherProps.error, errorProps: otherProps.errorProps, h: undefined, inputWrapperOrder: ['input', 'error'], leftSection: RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon), renderOption: renderOption, size: otherProps.size, style: { flex: 1 }, value: value?.toString(), w: undefined, onChange: handleChange, ...selectProps }) }));
    }
    else {
        return (_jsx(Select, { ...containerProps, data: data, description: otherProps.description, descriptionProps: otherProps.descriptionProps, error: otherProps.error, errorProps: otherProps.errorProps, label: otherProps.label, labelProps: otherProps.labelProps, leftSection: RenderIcon.renderIcon(otherProps.size ?? 'md', selectedIcon), renderOption: renderOption, required: otherProps.required, size: otherProps.size, value: value?.toString(), onChange: handleChange, ...selectProps }));
    }
}
//# sourceMappingURL=SelectField.js.map