import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputLabel, SegmentedControl } from '@mantine/core';
import { ItemsHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { useMemo } from 'react';
import { ContainerPropertiesHelper } from '#base';
import { ContainerControl, Primitive } from '#components/Common';
import { VerticalStack } from '#components/Layout';
const styleContainerItem = { hAlign: 'center' };
export function Segmented(props) {
    const { items, onChangedItem, selectedItem, imageDatabase, getValueItem = ItemsHelper.getValueOfItem, getLabelItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderItem, segmentedProps, size, useAccentSelection, ...otherProps } = props;
    const data = useMemo(() => items.map((item) => ({
        value: getValueItem(item).toString(),
        disabled: getDisabledItem(item),
        label: typeof renderItem === 'function' ? (renderItem(item)) : getLabelItem ? (getLabelItem(item)) : (_jsx(Primitive.Item, { imageDatabase: imageDatabase, item: item, size: size, wrapContainer: styleContainerItem }))
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
    const styles = useAccentSelection
        ? {
            // Индикатор (подложка, которая перемещается)
            indicator: {
                outline: `1px solid var(--mantine-color-${segmentedProps?.color ?? 'blue'}-filled)`,
                outlineOffset: '-1px', // Чтобы рамка была внутри и не обрезалась
                backgroundColor: `var(--mantine-color-${segmentedProps?.color ?? 'blue'}-light)` // Можно сделать легкий фон
            }
        }
        : undefined;
    if (useAccentSelection && segmentedProps) {
        segmentedProps.color = undefined;
    }
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerControl, { ...otherProps, control: _jsx(SegmentedControl, { data: data, h: undefined, size: size, style: { flex: 1, ...segmentedProps?.style }, styles: styles, value: selectedValue, w: undefined, onChange: handleChange, ...segmentedProps }), size: size, vAlign: "center" }));
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