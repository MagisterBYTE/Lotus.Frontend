import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import classes from './MRT_GlobalFilterTextInput.module.css';
import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Collapse, Menu, TextInput, Tooltip, } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
export const MRT_GlobalFilterTextInput = ({ table, ...rest }) => {
    const { getState, options: { enableGlobalFilterModes, icons: { IconSearch, IconX }, localization, mantineSearchTextInputProps, manualFiltering, positionGlobalFilter, }, refs: { searchInputRef }, setGlobalFilter, } = table;
    const { globalFilter, showGlobalFilter } = getState();
    const textFieldProps = {
        ...parseFromValuesOrFunc(mantineSearchTextInputProps, {
            table,
        }),
        ...rest,
    };
    const isMounted = useRef(false);
    const [searchValue, setSearchValue] = useState(globalFilter ?? '');
    const [debouncedSearchValue] = useDebouncedValue(searchValue, manualFiltering ? 500 : 250);
    useEffect(() => {
        setGlobalFilter(debouncedSearchValue || undefined);
    }, [debouncedSearchValue]);
    const handleClear = () => {
        setSearchValue('');
        setGlobalFilter(undefined);
    };
    useEffect(() => {
        if (isMounted.current) {
            if (globalFilter === undefined) {
                handleClear();
            }
            else {
                setSearchValue(globalFilter);
            }
        }
        isMounted.current = true;
    }, [globalFilter]);
    return (_jsxs(Collapse, { className: classes.collapse, in: showGlobalFilter, children: [enableGlobalFilterModes && (_jsxs(Menu, { withinPortal: true, children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { "aria-label": localization.changeSearchMode, color: "gray", size: "sm", variant: "transparent", children: _jsx(IconSearch, {}) }) }), _jsx(MRT_FilterOptionMenu, { onSelect: handleClear, table: table })] })), _jsx(TextInput, { leftSection: !enableGlobalFilterModes && _jsx(IconSearch, {}), mt: 0, mx: positionGlobalFilter !== 'left' ? 'mx' : undefined, onChange: (event) => setSearchValue(event.target.value), placeholder: localization.search, rightSection: _jsx(ActionIcon, { "aria-label": localization.clearSearch, color: "gray", disabled: !searchValue?.length, hidden: !searchValue, onClick: handleClear, size: "sm", style: {
                        visibility: !searchValue ? 'hidden' : undefined,
                    }, variant: "transparent", children: _jsx(Tooltip, { label: localization.clearSearch, withinPortal: true, children: _jsx(IconX, {}) }) }), value: searchValue ?? '', variant: "filled", ...textFieldProps, className: clsx('mrt-global-filter-text-input', classes.root, textFieldProps?.className), ref: (node) => {
                    if (node) {
                        searchInputRef.current = node;
                        if (textFieldProps?.ref) {
                            // @ts-ignore
                            textFieldProps.ref = node;
                        }
                    }
                } })] }));
};
//# sourceMappingURL=MRT_GlobalFilterTextInput.js.map