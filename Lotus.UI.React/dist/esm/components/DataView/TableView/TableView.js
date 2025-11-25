import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mantine/core';
import { StringHelper } from 'lotus-core/helpers';
import { LocalizationCore } from 'lotus-core/localization';
import { OptionHelper } from 'lotus-core/modules/option';
import { useEffect, useState } from 'react';
import { MantineReactTable } from '#external/mantine-react-table';
import { toastError, toastPromise, ToastWrapper } from '../../Feedback/Toast';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { EditTableFilterArray, EditTableFilterEnum, EditTableFilterString } from './TableViewFilterTypes';
export const TableView = (props) => {
    const { objectInfo, onGetItems, onTransformFilterRequest, onAddItem, onUpdateItem, onDuplicateItem, onDeleteItem, formCreated, formDeleted } = props;
    const properties = objectInfo.getProperties();
    // Получение данных
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [items, setItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({ pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 });
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, pageIndex: 0 });
    // Сортировка и фильтрация
    const [sortingColumn, setSortingColumn] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnFiltersFns, setColumnFiltersFns] = useState();
    const [globalFilter, setGlobalFilter] = useState('');
    // Редактирование текущей записи
    const [currentEditRow, setCurrentEditRow] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemInvalid, setCurrentItemInvalid] = useState(false);
    // Удаление
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    // Создание новой записи через окно
    const [openCreatedDialog, setOpenCreatedDialog] = useState(false);
    const [createdItem, setCreatedItem] = useState(null);
    const [autoCloseToastify, setAutoCloseToastify] = useState(2000);
    // Служебные методы для получения данных текущего редактируемого объекта
    const setSelectedValues = (accessorKey, newSelectedValues) => {
        const newItem = { ...currentItem };
        // @ts-ignore
        newItem[accessorKey] = newSelectedValues;
        setCurrentItem(newItem);
    };
    const setSelectedValue = (accessorKey, newSelectedValue) => {
        const newItem = { ...currentItem };
        // @ts-ignore
        newItem[accessorKey] = newSelectedValue;
        setCurrentItem(newItem);
    };
    // Модифицированные столбцы
    const editColumns = properties.map((property) => {
        const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        if (property.editing?.editorType === 'text') {
            column.mantineEditTextInputProps = {
                error: property.editing?.onValidation(currentItem).text,
                required: property.editing?.required,
                variant: 'outlined',
                size: 'small',
                type: 'text',
                onChange: (event) => {
                    const newItem = { ...currentItem };
                    newItem[column.accessorKey] = event.target.value;
                    setCurrentItem(newItem);
                    let isErrorValidation = false;
                    properties.forEach((c) => {
                        const errorValidation = c.editing?.onValidation(newItem).error;
                        if (errorValidation) {
                            isErrorValidation = true;
                            setCurrentItemInvalid(true);
                        }
                    });
                    if (isErrorValidation === false) {
                        setCurrentItemInvalid(false);
                    }
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
                error: property.editing?.onValidation(currentItem).text,
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
                error: property.editing?.onValidation(currentItem).text,
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
        const sorting = sortingColumn.map((column) => {
            const sort = {
                propertyPath: StringHelper.capitalizeFirstLetter(column.id),
                propertyTypeDesc: objectInfo.getPropertyByName(column.id).propertyTypeDesc,
                isDesc: column.desc
            };
            return sort;
        });
        const filtering = MantineReactTableHelper.convertColumnsFilterToFilterObjects(objectInfo, columnFilters, columnFiltersFns);
        const request = { pageInfo: pageInfo, sorting: sorting, filtering: filtering };
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
            setItems(response.payload);
            setPageInfo(response.pageInfo);
            setIsLoading(false);
            setIsRefetching(false);
        }
        catch (exc) {
            setIsLoading(false);
            setIsRefetching(false);
            toastError(exc, LocalizationCore.data.actions.gettingFailed);
        }
    };
    // #endregion
    //
    // #region Добавление данных
    //
    const handleAddRow = () => {
        if (onAddItem) {
            const result = toastPromise(onAddItem(), LocalizationCore.data.actions.adding, LocalizationCore.data.actions.addingSucceed, LocalizationCore.data.actions.addingFailed);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            result.then(async () => {
                await refreshItems(getFilterQueryItems());
            });
        }
        else {
            setCreatedItem(null);
            setOpenCreatedDialog(true);
        }
    };
    const handleCloseCreatedDialog = () => {
        setOpenCreatedDialog(false);
    };
    const handleOkCreatedDialog = async () => {
        setOpenCreatedDialog(false);
        await refreshItems(getFilterQueryItems());
    };
    // #endregion
    //
    // #region Редактирование данных
    //
    const handleEditRow = (table, row) => (event) => {
        table.setEditingRow(row);
        setCurrentEditRow(row);
        setCurrentItem(row.original);
    };
    const handleCancelRow = (table, row) => {
        table.setEditingRow(null);
        setCurrentEditRow(null);
        setCurrentItem(null);
    };
    // #endregion
    //
    // #region Дублирование данных
    //
    const handleDuplicateRow = (table, row) => { };
    // #endregion
    //
    // #region Обновление данных
    //
    const handleSaveRow = (table, row) => {
        const updateItem = { ...currentItem };
        if (onUpdateItem) {
            const result = toastPromise(onUpdateItem(updateItem), LocalizationCore.data.actions.saving, LocalizationCore.data.actions.savingSucceed, LocalizationCore.data.actions.savingFailed);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            result.then((value) => {
                const newItems = [...items];
                newItems[currentEditRow.index] = value.payload;
                setItems(newItems);
            });
        }
        table.setEditingRow(null);
        setCurrentEditRow(null);
    };
    // #endregion
    //
    // #region Удаление данных
    //
    const handleDeleteRow = (row) => {
        setDeleteItem(row.original);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const handleOkDeleteDialog = () => {
        setOpenDeleteDialog(false);
        if (onDeleteItem) {
            const result = toastPromise(onDeleteItem(deleteItem.id), LocalizationCore.data.actions.deleting, LocalizationCore.data.actions.deletingSucceed, LocalizationCore.data.actions.deletingFailed);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            result.then(() => {
                const newItems = items.filter((x) => x.id !== deleteItem.id);
                setItems(newItems);
            });
        }
        setDeleteItem(null);
    };
    // #endregion
    //
    // Фильтрация
    //
    const handleColumnFilterFnsChange = (updaterOrValue) => {
        const data = updaterOrValue;
        setColumnFiltersFns(data);
    };
    //
    // Методы оформления
    const renderTopToolbarCustomActions = (props) => {
        if (onAddItem || formCreated) {
            return (_jsx(Button, { color: "secondary", variant: "contained", onClick: () => handleAddRow(), children: LocalizationCore.data.actions.add }));
        }
        return _jsx(_Fragment, { children: " " });
    };
    //
    // Методы жизненного цикла
    //
    useEffect(() => {
        const filter = getFilterQueryItems();
        void refreshItems(filter);
    }, [paginationModel.pageIndex, paginationModel.pageSize, sortingColumn, columnFilters, columnFiltersFns, globalFilter]);
    useEffect(() => {
        const initialColumnFiltersFns = MantineReactTableHelper.getFilterOptions(objectInfo);
        setColumnFiltersFns(initialColumnFiltersFns);
    }, []);
    const localizationFull = {
        filterIncludeAny: LocalizationCore.data.filters.includeAny,
        filterIncludeAll: LocalizationCore.data.filters.includeAll,
        filterIncludeEquals: LocalizationCore.data.filters.includeEquals,
        filterIncludeNone: LocalizationCore.data.filters.includeNone
    };
    return (_jsxs(_Fragment, { children: [_jsx(MantineReactTable, { ...props, columns: editColumns, data: items, editDisplayMode: "row", enablePagination: true, filterFns: {
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
                }, manualFiltering: true, manualPagination: true, manualSorting: true, renderTopToolbarCustomActions: props.renderTopToolbarCustomActions ?? renderTopToolbarCustomActions, rowCount: pageInfo.totalCount, state: {
                    isLoading: isLoading,
                    showProgressBars: isRefetching,
                    showSkeletons: false,
                    pagination: paginationModel,
                    columnFilters: columnFilters,
                    columnFilterFns: columnFiltersFns,
                    globalFilter: globalFilter,
                    sorting: sortingColumn
                }, table: undefined, onColumnFilterFnsChange: handleColumnFilterFnsChange, onColumnFiltersChange: setColumnFilters, onGlobalFilterChange: setGlobalFilter, onPaginationChange: setPaginationModel, onSortingChange: setSortingColumn }), _jsx(ToastWrapper, { autoClose: autoCloseToastify }), formCreated &&
                formCreated({
                    open: openCreatedDialog,
                    onClose: handleCloseCreatedDialog,
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onCreate: handleOkCreatedDialog,
                    onCreatedItem: setCreatedItem
                })] }));
};
//# sourceMappingURL=TableView.js.map