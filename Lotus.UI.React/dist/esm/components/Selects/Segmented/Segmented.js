import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, SegmentedControl } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl } from '#components/Common';
import { VerticalStack } from '#components/Layout';
import { RenderItem } from '#render';
export function Segmented(props) {
    const { items, onChangedItem, selectedItem, imageDatabase, getValueItem = ItemsHelper.getValueOfItem, getLabelItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, segmentedProps, size, ...otherProps } = props;
    const data = useMemo(() => items.map(item => ({
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        label: typeof renderItem === 'function'
            ? renderItem(item)
            : getLabelItem
                ? getLabelItem(item)
                : RenderItem.renderItem(size ?? 'md', item, imageDatabase, { style: { padding: '0.25rem' } })
    })), [items, size, renderItem, getLabelItem, getValueItem, getDisabledItem]);
    const containerProps = ContainerPropertiesHelper.getContainerProperties(otherProps);
    const selectedValue = selectedItem ? getValueItem(selectedItem).toString() : undefined;
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
        return (_jsx(ContainerControl, { ...otherProps, control: _jsx(SegmentedControl, { data: data, h: undefined, size: size, style: { flex: 1, ...segmentedProps?.style }, value: selectedValue, w: undefined, onChange: handleChange, ...segmentedProps }), size: size, vAlign: "center" }));
    }
    else {
        if (otherProps.label) {
            return (_jsxs(VerticalStack, { ...containerProps, hAlign: "stretch", children: [_jsx(InputLabel, { ...otherProps.labelProps, ml: otherProps.labelProps?.ml ?? 'var(--mantine-spacing-sm)', required: otherProps.required, size: otherProps.labelProps?.size ?? size, children: otherProps.label }), _jsx(SegmentedControl, { ...containerProps, data: data, size: size, value: selectedValue, onChange: handleChange, ...segmentedProps })] }));
        }
        else {
            return _jsx(SegmentedControl, { ...containerProps, data: data, size: size, value: selectedValue, onChange: handleChange, ...segmentedProps });
        }
    }
}
//# sourceMappingURL=Segmented.js.map