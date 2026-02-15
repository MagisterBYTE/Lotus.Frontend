import { SimpleGrid, Card, Button, Menu, Group, Box, Text, Indicator, Checkbox, Stack, Badge, ActionIcon, Popover } from '@mantine/core';
import { IconCheck, IconFilter, IconFilterSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import {
  MRT_ColumnDef,
  MRT_ColumnFilterFnsState,
  MRT_FilterOption,
  MRT_FilterTextInput,
  MRT_Header,
  MRT_Row,
  MRT_TablePagination,
  useMantineReactTable
} from '#external/mantine-react-table';

// --- ТИПЫ ДАННЫХ ---
interface UserData {
  id: number;
  name: string;
  role: string;
}

// --- МЕМОИЗИРОВАННАЯ КАРТОЧКА ---
// Это критически важно: компонент карточки не должен перерисовываться,
// если данные строки или статус выделения не изменились.

function UserCard(props: { row: MRT_Row<UserData> }) 
{
  const { row } = props;
  const isSelected = row.getIsSelected();
  console.log('isSelected', isSelected);
  return (
    <Card
      withBorder
      // Стилизация теперь зависит только от isSelected
      shadow={isSelected ? 'md' : 'sm'}
      p="lg"
      // !!! УБРАН onClick С КАРТОЧКИ !!!
      style={{
        cursor: 'default', // Меняем курсор обратно на стандартный
        borderColor: isSelected ? 'var(--mantine-color-blue-filled)' : undefined,
        transition: 'transform 0.1s ease, shadow 0.2s ease'
      }}
    >
      <Group align="flex-start" justify="space-between" mb="xs">
        <Stack gap={0}>
          <Text fw={700} size="lg">
            {row.original.name}
          </Text>
          <Text c="dimmed" size="xs">
            ID: {row.original.id}
          </Text>
        </Stack>

        {/* !!! ИСПОЛЬЗУЕМ ОБРАБОТЧИК onChange И checked !!! */}
        <Checkbox
          checked={isSelected}
          // Используем прямой метод переключения вместо хендлера
          onChange={(event) => row.toggleSelected(event.currentTarget.checked)}
        />
      </Group>

      <Badge color={row.original.id > 1000 ? 'green' : 'gray'}>{row.original.role}</Badge>
    </Card>
  );
}

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export const CardViewTable = () => 
{
  // Колонки нужны MRT для работы поисковых движков и фильтров
  const columns = useMemo<MRT_ColumnDef<UserData>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Имя' },
      { accessorKey: 'role', header: 'Роль' }
    ],
    []
  );

  const data = useMemo<UserData[]>(
    () => [
      { id: 1, name: 'Админ', role: 'Admin' },
      { id: 105, name: 'Мария', role: 'User' },
      { id: 1002, name: 'Система', role: 'System' },
      { id: 1003, name: 'Бот', role: 'System' }
    ],
    []
  );

  // 1. Состояние для функций фильтрации (React-state)
  const [columnFilterFns, setColumnFilterFns] = useState<MRT_ColumnFilterFnsState>({
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
  const filterOptions: { value: MRT_FilterOption; label: string }[] = [
    { value: 'fuzzy', label: 'Умный поиск' },
    { value: 'contains', label: 'Содержит' },
    { value: 'startsWith', label: 'Начинается с' },
    { value: 'equals', label: 'Равно' },
    { value: 'notEquals', label: 'Не равно' }
  ];

  return (
    <Box p="md">
      {/* ВЕРХНЯЯ ПАНЕЛЬ: ФИЛЬТРЫ И ПАГИНАЦИЯ */}
      <Group justify="space-between" mb="xl">
        {/* Используем Popover вместо внешнего Menu */}
        <Popover 
          keepMounted 
          withArrow 
          closeOnClickOutside={true} 
          position="bottom-start" 
          width={300}
          shadow="md"
          // Позволяет кликать внутри Popover (включая вложенные меню) без закрытия
          trapFocus={false} 
        >
          <Popover.Target>
            <Indicator color="red" disabled={activeFiltersCount === 0} label={activeFiltersCount}>
              <Button leftSection={<IconFilter size={18} />} variant="light">
                Фильтры
              </Button>
            </Indicator>
          </Popover.Target>

          <Popover.Dropdown p="md">
            <Text fw={700} mb="md" size="sm">Фильтрация колонок</Text>
        
            {table.getLeafHeaders().map((header) => 
            {
              const mrtHeader = header as MRT_Header<UserData>;
              const column = mrtHeader.column;
              if (!column.getCanFilter()) return null;

              const currentFn = columnFilterFns[column.id] || 'fuzzy';
              
              // Создаем уникальный ID для инпута этой колонки
              const inputId = `filter-input-${column.id}`;

              return (
                <Box key={mrtHeader.id} mb="sm">
                  <Group justify="space-between" mb={4} wrap="nowrap">
                    <Text fw={500} size="xs">{column.columnDef.header}</Text>
                
                    {/* Внутреннее меню выбора функции (оно уже может быть Menu) */}
                    <Menu closeOnItemClick={true} shadow="xl" withinPortal={false}>
                      <Menu.Target>
                        <ActionIcon color="blue" size="sm" variant="subtle">
                          <IconFilterSearch size={14} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        {filterOptions.map((opt) => (
                          <Menu.Item
                            key={opt.value}
                            closeMenuOnClick={true} // Чтобы внутреннее меню не закрывалось сразу
                            rightSection={currentFn === opt.value ? <IconCheck size={14} /> : null}
                            onClick={(e) => 
                            {
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
                            }}
                          >
                            {opt.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  {/* Инпут MRT */}
                  <MRT_FilterTextInput id={inputId} header={mrtHeader} table={table}
                  />

                  <Text c="dimmed" mt={2} size="10px">
                    Режим: <b>{filterOptions.find(o => o.value === currentFn)?.label}</b>
                  </Text>
                </Box>
              );
            })}
        
            <Button 
              fullWidth 
              mt="md" 
              size="xs" 
              variant="subtle" 
              onClick={() => table.resetColumnFilters()}
            >
              Сбросить всё
            </Button>
          </Popover.Dropdown>
        </Popover>

        <MRT_TablePagination table={table} />
      </Group>

      {/* СЕТКА С КАРТОЧКАМИ */}
      {rows.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {rows.map((row) => (
            <UserCard key={row.id} row={row} />
          ))}
        </SimpleGrid>
      ) : (
        <Box py="xl" style={{ textAlign: 'center' }}>
          <Text c="dimmed">Ничего не найдено по вашему запросу</Text>
        </Box>
      )}
    </Box>
  );
};
