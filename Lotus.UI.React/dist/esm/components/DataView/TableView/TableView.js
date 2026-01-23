import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCircleX, IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import { LocalizationCore, LocalizationHelper, TLanguageTypes } from 'lotus-core/localization';
import { OptionHelper } from 'lotus-core/modules/option';
import { useEffect, useState } from 'react';
import { MantineReactTable, MRT_Localization_RU, MRT_Localization_EN } from '#external/mantine-react-table';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { EditTableFilterArray, EditTableFilterEnum, EditTableFilterString } from './TableViewFilterTypes';
const pageInfoResponseDefault = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 };
export const TableView = (props) => {
    const { objectInfo, onGetItems, onTransformFilterRequest, onAddItem, onUpdateItem, onDuplicateItem, onDeleteItem } = props;
    const properties = objectInfo.getProperties();
    const theme = useMantineTheme();
    const actualIcons = {
        IconDeviceFloppy: (props) => _jsx(IconDeviceFloppy, { ...props, color: theme.colors.info[5] }),
        IconCircleX: (props) => (_jsx(IconCircleX, { ...props, color: theme.colors.red[5] }))
    };
    // Получение данных
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [items, setItems] = useState([]);
    const [pageInfo, setPageInfo] = useState(pageInfoResponseDefault);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });
    // Сортировка и фильтрация
    const [sortingState, setSortingState] = useState([]);
    const [columnFiltersState, setColumnFiltersState] = useState([]);
    const [columnFiltersFns, setColumnFiltersFns] = useState();
    const [globalFilter, setGlobalFilter] = useState('');
    // Редактирование текущей записи
    const [currentEditRow, setCurrentEditRow] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemInvalid, setCurrentItemInvalid] = useState(false);
    const isDelete = Boolean(onDeleteItem);
    // Локализация
    const localizationFullRU = {
        filterIncludeAny: LocalizationCore.data.filters.includeAny,
        filterIncludeAll: LocalizationCore.data.filters.includeAll,
        filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
        filterIncludeNone: LocalizationCore.data.filters.includeNone,
        ...MRT_Localization_RU
    };
    const localizationFullEN = {
        filterIncludeAny: LocalizationCore.data.filters.includeAny,
        filterIncludeAll: LocalizationCore.data.filters.includeAll,
        filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
        filterIncludeNone: LocalizationCore.data.filters.includeNone,
        ...MRT_Localization_EN
    };
    const [localizationFull, setLocalizationFull] = useState(localizationFullRU);
    // Модифицированные столбцы
    const editColumns = properties.map((property) => {
        const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        if (property.editing?.editorType === 'text') {
            column.mantineEditTextInputProps = {
                required: property.editing?.required,
                type: 'text',
                onChange: (event) => {
                    const newItem = { ...currentItem };
                    newItem[column.accessorKey] = event.target.value;
                    setCurrentItem(newItem);
                }
            };
            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
        }
        if (property.editing?.editorType === 'select') {
            // eslint-disable-next-line react/display-name
            column.Cell = function ({ cell }) {
                const id = cell.getValue();
                const options = property.options;
                const text = OptionHelper.getLabelByValue(options, id);
                return _jsx(_Fragment, { children: text });
            };
            // column.Edit = function ({ cell, column, table })
            // {
            //   const id = cell.getValue() as TKey;
            //   const options = property.options!;
            //   return <SelectOption size='medium'
            //     width='100%'
            //     menuPortalTarget={document.body}
            //     initialSelectedValue={id}
            //     onSetSelectedValue={(selectedValue) => { setSelectedValue(property.fieldName, selectedValue!) }}
            //     options={options} />
            // }
            column.mantineEditTextInputProps = {
                // error: property.editing?.onValidation(currentItem).text,
                required: property.editing?.required,
                size: 'small',
                variant: 'outlined'
            };
            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
        }
        if (property.editing?.editorType === 'multi-select') {
            // eslint-disable-next-line react/display-name
            column.Cell = function ({ cell }) {
                const massive = cell.getValue();
                const options = property.options;
                const texts = OptionHelper.getLabelsByValues(options, massive);
                const text = texts.join(', ');
                return _jsx(_Fragment, { children: text });
            };
            // column.Edit = function ({ cell, column, table })
            // {
            //   const massive = cell.getValue() as any[];
            //   const options = property.options!;
            //   return <SelectOption size='medium'
            //     width='100%'
            //     initialSelectedValues={massive}
            //     onSetSelectedValues={(selectedValues) => { setSelectedValues(property.fieldName, selectedValues) }}
            //     options={options} />
            // }
            column.mantineEditTextInputProps = {
                // error: property.editing?.onValidation(currentItem).text,
                required: property.editing?.required,
                size: 'small',
                variant: 'outlined'
            };
            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
        }
        if (property.viewImage) {
            // column.Cell = function({ cell, row })
            // {
            //   const id = cell.getValue() as number;
            //   return <ImageBox id={id} />
            // }
            // column.Edit = function({ cell, column, table })
            // {
            //   const id = cell.getValue() as number;
            //   return <ImageGallery size='small'
            //     fullWidth
            //     variant='outlined'
            //     initialSelectedValue={id}
            //     onSetSelectedValue={(selectedValue) => { setSelectedValue(property.fieldName, selectedValue); } }
            //     images={ImageDatabase.getAllImages()} />
            // }
        }
        return column;
    });
    //
    // #region Получение данных
    //
    const getFilterQueryItems = () => {
        const pageInfo = { pageNumber: paginationModel.pageIndex, pageSize: paginationModel.pageSize };
        const sortings = MantineReactTableHelper.convertColumnsSortStateToSortObjects(objectInfo, sortingState);
        const filtering = MantineReactTableHelper.convertColumnsFilterStateToFilterObjects(objectInfo, columnFiltersState, columnFiltersFns);
        const request = { pageInfo: pageInfo, sorting: sortings, filtering: filtering };
        if (onTransformFilterRequest) {
            const transformRequest = onTransformFilterRequest(request);
            return transformRequest;
        }
        else {
            return request;
        }
    };
    const refreshItems = async (filter) => {
        try {
            if (!items.length) {
                setIsLoading(true);
            }
            else {
                setIsRefetching(true);
            }
            const response = await onGetItems(filter);
            if (response.payload && response.pageInfo) {
                setItems(response.payload);
                setPageInfo(response.pageInfo);
            }
            else {
                if (response.payload) {
                    setItems(response.payload);
                }
                else {
                    setItems([]);
                }
                setPageInfo(pageInfoResponseDefault);
            }
            setIsLoading(false);
            setIsRefetching(false);
        }
        catch (exc) {
            setIsLoading(false);
            setIsRefetching(false);
            throw exc;
        }
    };
    // #endregion
    //
    // #region Добавление данных
    //
    const handleAddRow = () => {
        if (onAddItem) {
            const result = onAddItem();
            void result.then(async () => {
                await refreshItems(getFilterQueryItems());
            });
        }
    };
    // #endregion
    //
    // #region Редактирование данных
    //
    const handleEditRowBegin = (props) => (event) => {
        const { row, table } = props;
        table.setEditingRow(row);
        setCurrentEditRow(row);
        setCurrentItem(row.original);
    };
    const handleEditRowCancel = (props) => {
        const { row, table } = props;
        table.setEditingRow(null);
        setCurrentEditRow(null);
        setCurrentItem(null);
    };
    const handleEditRowSave = (props) => {
        const { row, table } = props;
        const updateItem = { ...currentItem };
        if (onUpdateItem) {
            const responsePromise = onUpdateItem(updateItem);
            void responsePromise.then((response) => {
                if (response.result) {
                    if (response.result.succeeded) {
                        const newItems = [...items];
                        newItems[currentEditRow.index] = response.payload;
                        setItems(newItems);
                    }
                    else {
                        const newItems = [...items];
                        newItems[currentEditRow.index] = currentEditRow.original;
                        setItems(newItems);
                    }
                }
            });
        }
        table.setEditingRow(null);
        setCurrentEditRow(null);
        setCurrentItem(null);
    };
    // #endregion
    //
    // #region Удаление данных
    //
    const handleDeleteRow = (row) => (event) => {
        // setDeleteItem(row.original);
        // setOpenDeleteDialog(true);
    };
    // #endregion
    //
    // Фильтрация
    //
    const handleColumnFilterFnsChange = (updaterOrValue) => {
        const data = updaterOrValue;
        setColumnFiltersFns(data);
    };
    const handleTranslate = (lang) => {
        if (lang === TLanguageTypes.ru_RU) {
            setLocalizationFull(localizationFullRU);
        }
        else {
            setLocalizationFull(localizationFullEN);
        }
    };
    //
    // #region Методы жизненного цикла
    //
    useEffect(() => {
        const filter = getFilterQueryItems();
        void refreshItems(filter);
    }, [paginationModel.pageIndex, paginationModel.pageSize, sortingState, columnFiltersState, columnFiltersFns, globalFilter]);
    useEffect(() => {
        const initialColumnFiltersFns = MantineReactTableHelper.getFilterOptions(objectInfo);
        setColumnFiltersFns(initialColumnFiltersFns);
    }, []);
    useEffect(() => {
        const currentLang = LocalizationHelper.getDocumentLang();
        handleTranslate(currentLang);
    }, []);
    // #endregion
    // 
    // #region Render
    //
    const renderRowActionsEditRow = (props) => {
        return (_jsxs(Tooltip, { label: LocalizationCore.data.actions.edit, children: [_jsx(ActionIcon, { size: 'lg', variant: "default", onClick: handleEditRowBegin(props), children: _jsx(IconEdit, { color: theme.colors.info[5] }) }), isDelete && _jsx(ActionIcon, { size: 'lg', variant: "default", onClick: handleDeleteRow(props.row), children: _jsx(IconCircleX, { color: theme.colors.red[5] }) })] }));
    };
    // #endregion
    return (_jsx(_Fragment, { children: _jsx(MantineReactTable, { ...props, columns: editColumns, data: items, editDisplayMode: "row", enablePagination: true, filterFns: {
                includeAny: (row, id, filterValue) => {
                    return true;
                },
                includeAll: (row, id, filterValue) => {
                    return true;
                },
                includeEquals: (row, id, filterValue) => {
                    return true;
                },
                includeNone: (row, id, filterValue) => {
                    return true;
                }
            }, icons: actualIcons, localization: localizationFull, manualFiltering: true, manualPagination: true, manualSorting: true, renderRowActions: renderRowActionsEditRow, renderTopToolbarCustomActions: props.renderTopToolbarCustomActions, rowCount: pageInfo.totalCount, state: {
                isLoading: isLoading,
                showProgressBars: isRefetching,
                showSkeletons: false,
                pagination: paginationModel,
                columnFilters: columnFiltersState,
                columnFilterFns: columnFiltersFns,
                globalFilter: globalFilter,
                sorting: sortingState
            }, table: undefined, onColumnFilterFnsChange: handleColumnFilterFnsChange, onColumnFiltersChange: setColumnFiltersState, onEditingRowCancel: handleEditRowCancel, onEditingRowSave: handleEditRowSave, onGlobalFilterChange: setGlobalFilter, onPaginationChange: setPaginationModel, onSortingChange: setSortingState }) }));
};
//# sourceMappingURL=TableView.js.map