import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, SegmentedControl } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { useEffect, useState } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { VerticalStack } from '#components/Layout';
import { RenderItem } from '#render';
import { ContainerField } from '../ContainerField/ContainerField';
export function SegmentedField(props) {
    const { items, onChangedItem, selectedItem, getValueItem = ItemsHelper.getValueOfItem, getLabelItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, segmentedProps, ...otherProps } = props;
    const [data, setData] = useState([]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;
    const prepareData = () => {
        const newData = [];
        for (const item of items) {
            newData.push({
                label: renderItem ? renderItem(item) : (getLabelItem ? getLabelItem(item) : RenderItem.renderItem(otherProps.size ?? 'md', item, props, undefined, true)),
                value: getValueItem(item).toString(),
                disabled: getDisabledItem(item)
            });
        }
        setData(newData);
    };
    useEffect(() => {
        prepareData();
    }, [items, items.length, otherProps.size]);
    const handleChange = (value) => {
        if (onChangedItem) {
            if (Assert.emptyValue(value)) {
                onChangedItem(undefined);
            }
            else {
                for (const item of items) {
                    if (getValueItem(item).toString() === value) {
                        onChangedItem(item);
                        break;
                    }
                }
            }
        }
        if (segmentedProps?.onChange) {
            segmentedProps?.onChange(value);
        }
    };
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerField, { ...otherProps, componentField: _jsx(SegmentedControl, { data: data, h: undefined, size: otherProps.size, style: { flex: 1 }, value: selectedValue, w: undefined, onChange: handleChange, ...segmentedProps }), vAlign: "center" }));
    }
    else {
        if (otherProps.label) {
            return (_jsxs(VerticalStack, { ...containerProps, hAlign: "stretch", children: [_jsx(InputLabel, { ...otherProps.labelProps, required: otherProps.required, size: otherProps.labelProps?.size ?? otherProps.size, children: otherProps.label }), _jsx(SegmentedControl, { ...containerProps, data: data, size: otherProps.size, value: selectedValue, onChange: handleChange, ...segmentedProps })] }));
        }
        else {
            return _jsx(SegmentedControl, { ...containerProps, data: data, size: otherProps.size, value: selectedValue, onChange: handleChange, ...segmentedProps });
        }
    }
}
//# sourceMappingURL=SegmentedField.js.map