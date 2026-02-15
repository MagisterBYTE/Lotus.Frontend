import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Box, Combobox, Input, InputBase, Pagination, Popover, ScrollArea, SimpleGrid, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useResizer } from '#hooks';
import { RenderItem } from '#render';
export function GallerySelect(props) {
    const { size, columns = 3, hasFilter = false, onFilterItem, items, onChangedItem, selectedItem, renderItem, renderValue } = props;
    const [currentItem, setCurrentItem] = useState(selectedItem);
    const [opened, setOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [activePage, setPage] = useState(1);
    const [focusedIndex, setFocusedIndex] = useState(-1); // Индекс для клавиатуры
    const [sizeField, handleMouseDown] = useResizer(350, 450);
    // Фильтрация
    const filtered = useMemo(() => {
        if (onFilterItem) {
            return items.filter((x) => onFilterItem(x, search));
        }
        else {
            return items;
        }
    }, [items, search]);
    const actualItems = onFilterItem ? filtered : items;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(actualItems.length / itemsPerPage);
    const currentItems = actualItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const contextRender = { size: size };
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: `${sizeField.width}px`, // Берем из хука useResizer
        height: `${sizeField.height}px`, // Берем из хука useResizer
        minWidth: '280px',
        minHeight: '300px',
        overflow: 'hidden'
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
    // #endregion
    // #region Render
    const renderInternalValue = (item) => {
        if (typeof renderValue === 'function') {
            return renderValue(item, contextRender);
        }
        else {
            if (item) {
                return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
            }
            else {
                return _jsx(_Fragment, {});
            }
        }
    };
    const renderInternalItem = (item) => {
        if (typeof renderItem === 'function') {
            return renderItem(item, contextRender);
        }
        else {
            if (item) {
                return RenderItem.renderItem(size ?? 'md', item, undefined, { withBorder: true, p: 'xxs', bdRadius: 'md' });
            }
            else {
                return _jsx(_Fragment, {});
            }
        }
    };
    // #endregion
    return (_jsxs(Popover, { withArrow: true, opened: opened, position: "bottom-start", onChange: setOpened, children: [_jsx(Popover.Target, { children: _jsx(InputBase, { pointer: true, component: "button", h: undefined, rightSection: _jsx(Combobox.Chevron, {}), rightSectionPointerEvents: "none", type: "button", w: 'max-content', onClick: handleOpened, onKeyDown: handleKeyDownInput, children: _jsx("div", { style: { paddingTop: '4px', paddingBottom: '4px' }, children: currentItem ? renderInternalValue(currentItem) : _jsx(Input.Placeholder, { children: "Pick value" }) }) }) }), _jsx(Popover.Dropdown, { p: 0, onKeyDown: handleKeyDown, children: _jsxs("div", { style: containerStyle, children: [hasFilter && (_jsx(Box, { p: "xs", style: (theme) => ({ borderBottom: `1px solid ${theme.colors.gray[2]}` }), children: _jsx(TextInput, { leftSection: _jsx(IconSearch, { size: 14 }), placeholder: "\u041F\u043E\u0438\u0441\u043A...", value: search, onChange: (e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                    setFocusedIndex(-1);
                                } }) })), _jsx(ScrollArea, { p: "xs", style: { flex: 1 }, children: _jsx(SimpleGrid, { cols: columns, children: currentItems.map((item, index) => {
                                    return _jsx("div", { role: "button", onMouseDown: handleMouseDownSelect(item), children: renderInternalItem(item) }, index);
                                }) }) }), totalPages > 1 && (_jsx(Box, { p: "xs", style: (theme) => ({ borderTop: `1px solid ${theme.colors.gray[2]}` }), children: _jsx(Pagination, { size: "sm", total: totalPages, value: activePage, onChange: setPage }) })), _jsx("div", { role: "button", style: handleStyle, title: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u043C\u0435\u0440\u0430", onMouseDown: handleMouseDown })] }) })] }));
}
//# sourceMappingURL=GallerySelect.js.map