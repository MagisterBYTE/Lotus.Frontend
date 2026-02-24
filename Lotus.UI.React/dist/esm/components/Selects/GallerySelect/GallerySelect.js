import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Combobox, Input, InputBase, Pagination, Popover, ScrollArea, SimpleGrid, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { Assert } from 'lotus-core/utils';
import { useEffect, useMemo, useState } from 'react';
import { ContainerControl, Primitive } from '#components/Common';
import { Box } from '#components/Layout';
import { useResizer } from '#hooks';
import { TBorderSideFlags } from '#types';
const styleContainerItem = { withBorder: true, p: 'xxs', bdRadius: 'md' };
// eslint-disable-next-line complexity
export function GallerySelect(props) {
    const { size, columns = 3, hasFilter = false, onFilterItem, items, onChangedItem, selectedItem, renderItem, renderValue, selectRenderComponent, imageDatabase, inputProps, placeholder, containerProps, gridProps, paginationProps, ...otherProps } = props;
    const [currentItem, setCurrentItem] = useState(selectedItem);
    const [opened, setOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [activePage, setPage] = useState(1);
    const [focusedIndex, setFocusedIndex] = useState(-1); // Индекс для клавиатуры
    const [sizeField, handleMouseDown] = useResizer(350, 450);
    // Фильтрация
    const actualItems = useMemo(() => {
        if (!hasFilter || !onFilterItem)
            return items;
        return items.filter((x) => onFilterItem(x, search));
    }, [items, search, hasFilter, onFilterItem]);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(actualItems.length / itemsPerPage);
    const currentItems = actualItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const containerStyle = {
        display: containerProps?.style?.display ?? 'flex',
        flexDirection: containerProps?.style?.flexDirection ?? 'column',
        position: containerProps?.style?.position ?? 'relative',
        width: `${sizeField.width}px`, // Берем из хука useResizer
        height: `${sizeField.height}px`, // Берем из хука useResizer
        minWidth: containerProps?.style?.minWidth ?? '280px',
        minHeight: containerProps?.style?.minHeight ?? '300px',
        overflow: 'hidden',
        ...containerProps?.style
    };
    const handleStyle = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '16px',
        height: '16px',
        cursor: 'nwse-resize',
        zIndex: 100,
        // Используем radial-gradient для создания паттерна "точек"
        backgroundImage: 'radial-gradient(#ced4da 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        backgroundPosition: 'center',
        // Небольшой отступ, чтобы точки не прилипали к самому краю
        margin: '2px'
    };
    // #region Effect
    useEffect(() => {
        setCurrentItem(selectedItem);
    }, [items, selectedItem]);
    // #endregion
    // #region Handlers
    const handleOpened = () => {
        setOpened(!opened);
    };
    const handleKeyDownInput = (event) => {
        if (event.key === 'Enter') {
            setOpened(true);
        }
    };
    const handleKeyDown = (event) => {
        if (!opened)
            return;
        switch (event.key) {
            case 'ArrowRight':
                setFocusedIndex((prev) => Math.min(prev + 1, currentItems.length - 1));
                break;
            case 'ArrowLeft':
                setFocusedIndex((prev) => Math.max(prev - 1, 0));
                break;
            case 'ArrowDown':
                setFocusedIndex((prev) => Math.min(prev + Number(columns), currentItems.length - 1));
                break;
            case 'ArrowUp':
                setFocusedIndex((prev) => Math.max(prev - Number(columns), 0));
                break;
            case 'Enter':
                if (focusedIndex >= 0)
                    handleSelect(currentItems[focusedIndex]);
                break;
            case 'Escape':
                setOpened(false);
                break;
        }
    };
    const handleSelect = (item) => {
        if (onChangedItem)
            onChangedItem(item);
        setCurrentItem(item);
        setOpened(false);
        setSearch('');
        setFocusedIndex(-1);
    };
    const handleMouseDownSelect = (item) => (_event) => {
        handleSelect(item);
    };
    const handleFilter = (event) => {
        setSearch(event.target.value);
        setPage(1);
        setFocusedIndex(-1);
    };
    const handleClearFilter = () => {
        setSearch('');
        setPage(1);
        setFocusedIndex(-1);
    };
    // #endregion
    // #region Render
    const renderInternalValue = (item) => {
        const contextRender = { size: size };
        if (typeof renderValue === 'function') {
            const contentValue = renderValue(item, contextRender);
            if (Assert.existValue(contentValue)) {
                return contentValue;
            }
            else {
                return _jsx(Input.Placeholder, { children: placeholder ?? 'Pick value' });
            }
        }
        else {
            if (item) {
                return _jsx(Primitive.Item, { imageDatabase: imageDatabase, item: item, size: size, wrapContainer: styleContainerItem });
            }
            else {
                return _jsx(_Fragment, {});
            }
        }
    };
    const renderInternalItem = (item) => {
        const contextRender = { size: size, selected: item === currentItem };
        if (typeof renderItem === 'function') {
            return renderItem(item, contextRender);
        }
        else {
            if (item) {
                return _jsx(Primitive.Item, { imageDatabase: imageDatabase, item: item, size: size, wrapContainer: styleContainerItem });
            }
            else {
                return _jsx(_Fragment, {});
            }
        }
    };
    const renderComponent = () => {
        return (_jsxs(Popover, { withArrow: true, opened: opened, position: "bottom-start", onChange: setOpened, children: [_jsx(Popover.Target, { children: _jsx(InputBase, { pointer: true, component: "button", h: 'auto', rightSection: _jsx(Combobox.Chevron, {}), rightSectionPointerEvents: "none", size: inputProps?.size ?? size, styles: {
                            input: {
                                height: 'auto',
                                minHeight: 'unset', // Убираем стандартный минимум Mantine
                                paddingTop: '0.2rem',
                                paddingBottom: '0.2rem',
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }, type: "button", w: 'fit-content', onClick: handleOpened, onKeyDown: handleKeyDownInput, ...inputProps, children: renderInternalValue(currentItem) }) }), _jsx(Popover.Dropdown, { p: 0, onKeyDown: handleKeyDown, children: _jsxs("div", { ...containerProps, style: containerStyle, children: [hasFilter && (_jsx(Box, { p: "xs", withBorder: TBorderSideFlags.Bottom, children: _jsx(TextInput, { leftSection: _jsx(IconSearch, { size: size }), placeholder: LocalizationCore.data.actions.search, rightSection: search !== '' ? _jsx(Input.ClearButton, { onClick: handleClearFilter }) : undefined, value: search, onChange: handleFilter }) })), _jsx(ScrollArea, { p: "xs", style: { flex: 1 }, children: _jsx(SimpleGrid, { cols: columns, ...gridProps, children: currentItems.map((item, index) => {
                                        return (_jsx(Box
                                        // eslint-disable-next-line react/no-array-index-key
                                        , { bdColor: selectRenderComponent ? (item === currentItem ? 'primary' : undefined) : undefined, bdRadius: selectRenderComponent ? true : undefined, bdShadow: selectRenderComponent ? (item === currentItem ? 5 : 1) : undefined, centerContent: 'center', m: 'xxs', p: 'xxs', role: "button", withBorder: selectRenderComponent ? true : undefined, onClick: handleMouseDownSelect(item), children: renderInternalItem(item) }, index));
                                    }) }) }), totalPages > 1 && (_jsx(Box, { p: "xs", withBorder: TBorderSideFlags.Top, children: _jsx(Pagination, { size: size, total: totalPages, value: activePage, onChange: setPage, ...paginationProps }) })), _jsx("div", { role: "button", style: handleStyle, onMouseDown: handleMouseDown })] }) })] }));
    };
    // #endregion
    if (otherProps.inlinePlace) {
        return (_jsx(ContainerControl, { ...otherProps, control: renderComponent(), size: size, vAlign: otherProps.vAlign ?? (Assert.emptyValue(otherProps.error) && Assert.emptyValue(otherProps.description) ? 'center' : undefined) }));
    }
    else {
        return renderComponent();
    }
}
//# sourceMappingURL=GallerySelect.js.map