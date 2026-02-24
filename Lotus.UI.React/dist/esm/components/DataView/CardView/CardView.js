import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SimpleGrid, Button, Menu, Group, Box, Text, Indicator, ActionIcon, Popover } from '@mantine/core';
import { IconCheck, IconFilter, IconFilterSearch } from '@tabler/icons-react';
import { ItemsHelper } from 'lotus-core/helpers';
import { useMemo, useState } from 'react';
import { MRT_FilterTextInput, MRT_TablePagination, useMantineReactTable } from '#external/mantine-react-table';
import { MantineReactTableHelper } from '../TableView/MantineReactTableHelper';
import { useTableViewLocalization } from '../TableView/useTableViewLocalization';
const pageInfoResponseDefault = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 };
export function CardView(props) {
    const { disabled, size, items, objectInfo, onChangedItem, selectedItem, imageDatabase, selectRenderComponent, getValueItem = ItemsHelper.getValueOfItem, getLabelItem = ItemsHelper.getLabelOfItem, getDisabledItem = ItemsHelper.getDisabledOfItem, renderCard, ...otherProps } = props;
    const properties = objectInfo.getProperties();
    const columns = useMemo(() => properties.map((property) => {
        const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        return column;
    }), []);
    // Получение данных
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    // const [items, setItems] = useState<TItem[]>([]);
    const [pageInfo, setPageInfo] = useState(pageInfoResponseDefault);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });
    // Сортировка и фильтрация
    const [sortingState, setSortingState] = useState([]);
    const [columnFiltersState, setColumnFiltersState] = useState([]);
    const [columnFiltersFns, setColumnFiltersFns] = useState();
    const [globalFilter, setGlobalFilter] = useState('');
    // Локализация
    const localizationFull = useTableViewLocalization();
    const table = useMantineReactTable({
        columns: columns,
        data: items,
        enableRowSelection: true,
        enableColumnFilters: true,
        enablePagination: true,
        rowCount: items.length,
        state: {
            isLoading: isLoading,
            showProgressBars: isRefetching,
            showSkeletons: false,
            pagination: paginationModel,
            columnFilters: columnFiltersState,
            columnFilterFns: columnFiltersFns,
            globalFilter: globalFilter,
            sorting: sortingState
        },
        localization: localizationFull,
        // memoMode 'rows' заставляет MRT не пересоздавать объекты строк без нужды
        memoMode: 'rows',
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPaginationModel,
        onSortingChange: setSortingState
    });
    // Достаем отфильтрованные строки
    const { rows } = table.getRowModel();
    const { columnFilters, rowSelection } = table.getState();
    const activeFiltersCount = columnFilters.length;
    const selectedCount = Object.keys(rowSelection).length;
    // Опции для текстовых полей
    const filterOptions = [
        { value: 'fuzzy', label: 'Умный поиск' },
        { value: 'contains', label: 'Содержит' },
        { value: 'startsWith', label: 'Начинается с' },
        { value: 'equals', label: 'Равно' },
        { value: 'notEquals', label: 'Не равно' }
    ];
    return (_jsxs(Box, { p: "md", children: [_jsxs(Group, { justify: "space-between", mb: "xl", children: [_jsxs(Popover, { keepMounted: true, withArrow: true, closeOnClickOutside: true, position: "bottom-start", width: 300, shadow: "md", 
                        // Позволяет кликать внутри Popover (включая вложенные меню) без закрытия
                        trapFocus: false, children: [_jsx(Popover.Target, { children: _jsx(Indicator, { color: "red", disabled: activeFiltersCount === 0, label: activeFiltersCount, children: _jsx(Button, { leftSection: _jsx(IconFilter, { size: 18 }), variant: "light", children: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B" }) }) }), _jsxs(Popover.Dropdown, { p: "md", children: [_jsx(Text, { fw: 700, mb: "md", size: "sm", children: "\u0424\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u044F \u043A\u043E\u043B\u043E\u043D\u043E\u043A" }), table.getLeafHeaders().map((header) => {
                                        const mrtHeader = header;
                                        const column = mrtHeader.column;
                                        if (!column.getCanFilter())
                                            return null;
                                        // const currentFn = columnFiltersFns![column.id] || 'fuzzy';
                                        const currentFn = 'fuzzy';
                                        // Создаем уникальный ID для инпута этой колонки
                                        const inputId = `filter-input-${column.id}`;
                                        return (_jsxs(Box, { mb: "sm", children: [_jsxs(Group, { justify: "space-between", mb: 4, wrap: "nowrap", children: [_jsx(Text, { fw: 500, size: "xs", children: column.columnDef.header }), _jsxs(Menu, { closeOnItemClick: true, shadow: "xl", withinPortal: false, children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { color: "blue", size: "sm", variant: "subtle", children: _jsx(IconFilterSearch, { size: 14 }) }) }), _jsx(Menu.Dropdown, { children: filterOptions.map((opt) => (_jsx(Menu.Item, { closeMenuOnClick: true, rightSection: currentFn === opt.value ? _jsx(IconCheck, { size: 14 }) : null, onClick: (e) => {
                                                                            // Останавливаем всплытие, чтобы Popover не перехватил клик
                                                                            e.stopPropagation();
                                                                            setColumnFiltersFns((prev) => ({
                                                                                ...prev,
                                                                                [column.id]: opt.value
                                                                            }));
                                                                        }, children: opt.label }, opt.value))) })] })] }), _jsx(MRT_FilterTextInput, { header: mrtHeader, id: inputId, table: table }), _jsxs(Text, { c: "dimmed", mt: 2, size: "10px", children: ["\u0420\u0435\u0436\u0438\u043C: ", _jsx("b", { children: filterOptions.find(o => o.value === currentFn)?.label })] })] }, mrtHeader.id));
                                    }), _jsx(Button, { fullWidth: true, mt: "md", size: "xs", variant: "subtle", onClick: () => table.resetColumnFilters(), children: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0451" })] })] }), _jsx(MRT_TablePagination, { table: table })] }), rows.length > 0 ? (_jsx(SimpleGrid, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: rows.map((row) => {
                    return renderCard(row.original);
                }) })) : (_jsx(Box, { py: "xl", style: { textAlign: 'center' }, children: _jsx(Text, { c: "dimmed", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }))] }));
}
//# sourceMappingURL=CardView.js.map