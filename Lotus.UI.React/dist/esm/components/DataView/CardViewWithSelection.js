import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SimpleGrid, Card, Button, Menu, Group, Box, Text, Indicator, Checkbox, Stack, Badge, ActionIcon, Popover } from '@mantine/core';
import { IconCheck, IconFilter, IconFilterSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { MRT_FilterTextInput, MRT_TablePagination, useMantineReactTable } from '#external/mantine-react-table';
// --- МЕМОИЗИРОВАННАЯ КАРТОЧКА ---
// Это критически важно: компонент карточки не должен перерисовываться,
// если данные строки или статус выделения не изменились.
function UserCard(props) {
    const { row } = props;
    const isSelected = row.getIsSelected();
    console.log('isSelected', isSelected);
    return (_jsxs(Card, { withBorder: true, 
        // Стилизация теперь зависит только от isSelected
        shadow: isSelected ? 'md' : 'sm', p: "lg", 
        // !!! УБРАН onClick С КАРТОЧКИ !!!
        style: {
            cursor: 'default', // Меняем курсор обратно на стандартный
            borderColor: isSelected ? 'var(--mantine-color-blue-filled)' : undefined,
            transition: 'transform 0.1s ease, shadow 0.2s ease'
        }, children: [_jsxs(Group, { align: "flex-start", justify: "space-between", mb: "xs", children: [_jsxs(Stack, { gap: 0, children: [_jsx(Text, { fw: 700, size: "lg", children: row.original.name }), _jsxs(Text, { c: "dimmed", size: "xs", children: ["ID: ", row.original.id] })] }), _jsx(Checkbox, { checked: isSelected, 
                        // Используем прямой метод переключения вместо хендлера
                        onChange: (event) => row.toggleSelected(event.currentTarget.checked) })] }), _jsx(Badge, { color: row.original.id > 1000 ? 'green' : 'gray', children: row.original.role })] }));
}
// --- ОСНОВНОЙ КОМПОНЕНТ ---
export const CardViewTable = () => {
    // Колонки нужны MRT для работы поисковых движков и фильтров
    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Имя' },
        { accessorKey: 'role', header: 'Роль' }
    ], []);
    const data = useMemo(() => [
        { id: 1, name: 'Админ', role: 'Admin' },
        { id: 105, name: 'Мария', role: 'User' },
        { id: 1002, name: 'Система', role: 'System' },
        { id: 1003, name: 'Бот', role: 'System' }
    ], []);
    // 1. Состояние для функций фильтрации (React-state)
    const [columnFilterFns, setColumnFilterFns] = useState({
        id: 'equals',
        name: 'fuzzy',
        role: 'contains'
    });
    const table = useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableColumnFilters: true,
        enablePagination: true,
        // memoMode 'rows' заставляет MRT не пересоздавать объекты строк без нужды
        memoMode: 'rows',
        positionPagination: 'bottom',
        initialState: { pagination: { pageSize: 6, pageIndex: 0 } },
        state: {
            columnFilterFns // Передаем состояние в MRT
        },
        onColumnFilterFnsChange: setColumnFilterFns // Обработчик изменений
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
                                        const currentFn = columnFilterFns[column.id] || 'fuzzy';
                                        // Создаем уникальный ID для инпута этой колонки
                                        const inputId = `filter-input-${column.id}`;
                                        return (_jsxs(Box, { mb: "sm", children: [_jsxs(Group, { justify: "space-between", mb: 4, wrap: "nowrap", children: [_jsx(Text, { fw: 500, size: "xs", children: column.columnDef.header }), _jsxs(Menu, { closeOnItemClick: true, shadow: "xl", withinPortal: false, children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { color: "blue", size: "sm", variant: "subtle", children: _jsx(IconFilterSearch, { size: 14 }) }) }), _jsx(Menu.Dropdown, { children: filterOptions.map((opt) => (_jsx(Menu.Item, { closeMenuOnClick: true, rightSection: currentFn === opt.value ? _jsx(IconCheck, { size: 14 }) : null, onClick: (e) => {
                                                                            // Останавливаем всплытие, чтобы Popover не перехватил клик
                                                                            e.stopPropagation();
                                                                            setColumnFilterFns((prev) => ({
                                                                                ...prev,
                                                                                [column.id]: opt.value
                                                                            }));
                                                                            // 2. ФОКУС-ХАК: Находим инпут по ID и возвращаем ему фокус
                                                                            // Используем setTimeout(0), чтобы дождаться окончания обработки клика в меню
                                                                            // setTimeout(() => 
                                                                            // {
                                                                            //   const input = document.getElementById(inputId);
                                                                            //   if (input) input.focus();
                                                                            // }, 0);
                                                                        }, children: opt.label }, opt.value))) })] })] }), _jsx(MRT_FilterTextInput, { id: inputId, header: mrtHeader, table: table }), _jsxs(Text, { c: "dimmed", mt: 2, size: "10px", children: ["\u0420\u0435\u0436\u0438\u043C: ", _jsx("b", { children: filterOptions.find(o => o.value === currentFn)?.label })] })] }, mrtHeader.id));
                                    }), _jsx(Button, { fullWidth: true, mt: "md", size: "xs", variant: "subtle", onClick: () => table.resetColumnFilters(), children: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0451" })] })] }), _jsx(MRT_TablePagination, { table: table })] }), rows.length > 0 ? (_jsx(SimpleGrid, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: rows.map((row) => (_jsx(UserCard, { row: row }, row.id))) })) : (_jsx(Box, { py: "xl", style: { textAlign: 'center' }, children: _jsx(Text, { c: "dimmed", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }))] }));
};
//# sourceMappingURL=CardViewWithSelection.js.map