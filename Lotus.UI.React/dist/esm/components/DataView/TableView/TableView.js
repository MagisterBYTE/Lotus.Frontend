import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Button, Modal, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCircleX, IconDeviceFloppy, IconEdit, IconTextDecrease, IconTextIncrease } from '@tabler/icons-react';
import { StringHelper } from 'lotus-core/helpers';
import { LocalizationCore } from 'lotus-core/localization';
import { ObjectInfo } from 'lotus-core/modules/objectInfo';
import { ResponseHelper } from 'lotus-core/modules/requestAndResponse';
import { ObjectName } from 'lotus-core/utils';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '#components/Display';
import { HorizontalStack, VerticalStack } from '#components/Layout';
import { MantineReactTable, useMantineReactTable, createRow, MRT_ToggleGlobalFilterButton, MRT_ToggleFiltersButton, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton } from '#external/mantine-react-table';
import { TSizeTypes } from '#types';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { createDisabledSaveButtonEvent } from './TableViewEvents';
import { EditTableFilterArray, EditTableFilterString } from './TableViewFilterTypes';
import { TableViewMultiSelectView } from './components/TableViewMultiSelectView';
import { TableViewSelectView } from './components/TableViewSelectView';
import { TableViewTextView } from './components/TableViewTextView';
import { useTableViewLocalization } from './useTableViewLocalization';
import { MultiSelect, Select } from '#components/Selects';
const pageInfoResponseDefault = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 };
export function TableView(props) {
    const { size = 'md', objectInfo, validator, onGetItems, onTransformFilterRequest, onAddItem, onCreateItem, onUpdateItem, onDuplicateItem, onDeleteItem } = props;
    const properties = objectInfo.getProperties();
    const theme = useMantineTheme();
    const blueColor = theme.colors.blue[5];
    const redColor = theme.colors.red[5];
    const actualIcons = {
        IconDeviceFloppy: (props) => _jsx(IconDeviceFloppy, { ...props, color: blueColor }),
        IconCircleX: (props) => _jsx(IconCircleX, { ...props, color: redColor })
    };
    // Статус
    const isAdd = Boolean(onAddItem);
    const isCreate = Boolean(onCreateItem);
    const isUpdate = Boolean(onUpdateItem);
    const isDelete = Boolean(onDeleteItem);
    // Размер
    const [actualSize, setActualSize] = useState(size);
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
    const [currentEditRow, setCurrentEditRow] = useState(undefined);
    const [currentItem, setCurrentItem] = useState(undefined);
    const [currentItemValid, setCurrentItemValid] = useState(false);
    const [editItemName, setEditItemName] = useState('');
    const [hashValid, setHashValid] = useState(0);
    const [isUpdatingProcess, setUpdatingProcess] = useState(false);
    // Удаление
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItem, setDeleteItem] = useState(undefined);
    const [deleteItemName, setDeleteItemName] = useState('');
    const [isDeletingProcess, setDeletingProcess] = useState(false);
    // Локализация
    const localizationFull = useTableViewLocalization();
    // Текущий контекст ренденинга
    const contextRender = { disabled: props.disabled, size: actualSize, theme: theme };
    // Модифицированные столбцы
    const editColumns = useMemo(() => properties.map((property) => {
        const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        if (property.editing?.editorType === 'text' || property.editing?.editorType === undefined) {
            // eslint-disable-next-line react/display-name
            column.Cell = (props) => (_jsx(TableViewTextView, { ...props, contextRender: contextRender, objectInfo: objectInfo, property: property, validator: validator }));
            // Режим редактирования
            column.mantineEditTextInputProps = {
                required: property.editing?.required,
                disabled: props.disabled,
                size: actualSize,
                type: 'text',
                error: validator?.validationStatus.getErrorByKey(property.fieldName),
                onChange: (event) => {
                    const newItem = { ...currentItem };
                    newItem[column.accessorKey] = event.target.value;
                    setCurrentItem(newItem);
                },
                ...property.visualSettings?.propsEdit
            };
            // Набор фильтров для строки
            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
        }
        if (property.editing?.editorType === 'select') {
            // eslint-disable-next-line react/display-name
            column.Cell = (props) => (_jsx(TableViewSelectView, { ...props, contextRender: contextRender, objectInfo: objectInfo, property: property, validator: validator }));
            // eslint-disable-next-line react/display-name
            column.Edit = function ({ cell, column, table, row }) {
                const selectedValue = currentItem ? String(currentItem[property.fieldName]) : String(cell.getValue());
                const items = property.possibleValues;
                const isModalMode = table.options.editDisplayMode === 'modal';
                return (_jsx(Select, { disabled: props.disabled, error: validator?.validationStatus.getErrorByKey(property.fieldName), items: items, label: isModalMode ? property.name : undefined, required: isModalMode ? property.editing?.required : undefined, selectedItem: selectedValue, selectProps: {
                        withAlignedLabels: true,
                        withCheckIcon: true,
                        onChange: (value) => {
                            const newItem = ObjectInfo.updatedObject(currentItem, property, value);
                            setCurrentItem(newItem);
                        }
                    }, size: actualSize, w: '100%', ...property.visualSettings?.propsEdit }));
            };
            // Набор фильтров для строки
            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
        }
        if (property.editing?.editorType === 'multi-select') {
            // eslint-disable-next-line react/display-name
            column.Cell = (props) => (_jsx(TableViewMultiSelectView, { ...props, contextRender: contextRender, objectInfo: objectInfo, property: property, validator: validator }));
            // eslint-disable-next-line react/display-name
            column.Edit = function ({ cell }) {
                const selectedValues = currentItem ? currentItem[property.fieldName] : cell.getValue();
                const items = property.possibleValues;
                const isModalMode = table.options.editDisplayMode === 'modal';
                return (_jsx(MultiSelect, { disabled: props.disabled, error: validator?.validationStatus.getErrorByKey(property.fieldName), items: items, label: isModalMode ? property.name : undefined, required: isModalMode ? property.editing?.required : undefined, selectedItems: selectedValues, selectProps: {
                        withAlignedLabels: true,
                        withCheckIcon: true,
                        onChange: (value) => {
                            const newItem = ObjectInfo.updatedObject(currentItem, property, value);
                            setCurrentItem(newItem);
                        }
                    }, size: actualSize, w: "100%", ...property.visualSettings?.propsEdit }));
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
    }), [hashValid, currentItem, actualSize]);
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
    const refreshItemsAsync = async (filter) => {
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
    const handleCreateRowBeginAsync = async () => {
        if (onCreateItem) {
            const response = await onCreateItem();
            if (ResponseHelper.succeed(response) && response.payload) {
                setCurrentItem(response.payload);
                table.setCreatingRow(createRow(table, response.payload));
            }
        }
        else {
            setCurrentItem(undefined);
            table.setCreatingRow(true);
        }
        const createObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.createObject, objectInfo.objectName);
        setEditItemName(createObjectName);
    };
    const handleCreateRowSave = (props) => {
        const { row, table, exitCreatingMode } = props;
        const createdItem = { ...currentItem };
        if (onAddItem) {
            const responsePromise = onAddItem(createdItem);
            void responsePromise.then((response) => {
                if (ResponseHelper.succeed(response)) {
                    const newItems = [...items, createdItem];
                    setItems(newItems);
                }
            });
        }
        setCurrentItem(undefined);
        validator?.reset();
        exitCreatingMode();
    };
    const handleCreateRowCancel = (props) => {
        setCurrentItem(undefined);
        validator?.reset();
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
        const itemName = ObjectName.getName(row.original);
        const editObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.editObject, itemName);
        setEditItemName(editObjectName);
    };
    const handleEditRowCancel = (props) => {
        const { row, table } = props;
        table.setEditingRow(null);
        setCurrentEditRow(undefined);
        setCurrentItem(undefined);
        validator?.reset();
    };
    const handleEditRowSave = (props) => {
        const { row, table } = props;
        const updateItem = { ...currentItem };
        if (onUpdateItem) {
            setUpdatingProcess(true);
            const responsePromise = onUpdateItem(updateItem);
            void responsePromise
                .then((response) => {
                if (ResponseHelper.succeed(response)) {
                    const newItems = [...items];
                    newItems[currentEditRow.index] = response.payload;
                    setItems(newItems);
                }
                else {
                    const newItems = [...items];
                    newItems[currentEditRow.index] = currentEditRow.original;
                    setItems(newItems);
                }
            })
                .finally(() => {
                setUpdatingProcess(false);
            });
        }
        table.setEditingRow(null);
        setCurrentEditRow(undefined);
        setCurrentItem(undefined);
        validator?.reset();
    };
    // #endregion
    //
    // #region Удаление данных
    //
    const handleDeleteRow = (row) => (event) => {
        setDeleteItem(row.original);
        setOpenDeleteDialog(true);
        const itemName = ObjectName.getName(row.original);
        const deleteObjectName = StringHelper.stringFormat(LocalizationCore.data.actions.deleteObject, itemName);
        setDeleteItemName(deleteObjectName);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setDeleteItem(undefined);
    };
    const handleOkDeleteDialogAsync = async () => {
        setOpenDeleteDialog(false);
        if (deleteItem && onDeleteItem) {
            setDeletingProcess(true);
            const response = await onDeleteItem(deleteItem.id);
            setDeletingProcess(false);
            if (ResponseHelper.succeed(response)) {
                await refreshItemsAsync(getFilterQueryItems());
            }
        }
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
    // Размер шрифта
    //
    const handleIncreaseFont = () => {
        const newFontSize = TSizeTypes.next(actualSize);
        setActualSize(newFontSize);
    };
    const handleDecreaseFont = () => {
        const newFontSize = TSizeTypes.prev(actualSize);
        setActualSize(newFontSize);
    };
    //
    // #region Методы жизненного цикла
    //
    useEffect(() => {
        const filter = getFilterQueryItems();
        void refreshItemsAsync(filter);
    }, [paginationModel.pageIndex, paginationModel.pageSize, sortingState, columnFiltersState, columnFiltersFns, globalFilter]);
    useEffect(() => {
        const initialColumnFiltersFns = MantineReactTableHelper.getFilterOptions(objectInfo);
        setColumnFiltersFns(initialColumnFiltersFns);
    }, []);
    // #endregion
    //
    // #region Render
    //
    const renderRowActionsEditRow = (props) => {
        return (_jsxs(HorizontalStack, { spacing: actualSize, children: [isUpdate && (_jsx(Tooltip, { label: LocalizationCore.data.actions.edit, children: _jsx(ActionIcon, { size: TSizeTypes.next(actualSize, 1, 'xl'), variant: "default", onClick: handleEditRowBegin(props), children: _jsx(IconEdit, { color: blueColor, height: '100%', width: '100%' }) }) })), isDelete && (_jsx(Tooltip, { label: LocalizationCore.data.actions.delete, children: _jsx(ActionIcon, { size: TSizeTypes.next(actualSize, 1, 'xl'), variant: "default", onClick: handleDeleteRow(props.row), children: _jsx(IconCircleX, { color: redColor, height: '100%', width: '100%' }) }) }))] }));
    };
    const renderTopToolbarCustomActionsAddRow = (props) => {
        return (_jsxs(Button, { m: "md", onClick: handleCreateRowBeginAsync, children: [LocalizationCore.data.actions.add, actualSize, "-", TSizeTypes.next(actualSize, 1, 'lg'), "-", TSizeTypes.prev(actualSize, 1, 'xs')] }));
    };
    const renderToolbarInternalActions = (props) => {
        return (_jsxs(_Fragment, { children: [_jsx(MRT_ToggleGlobalFilterButton, { table: table }), _jsx(MRT_ToggleFiltersButton, { table: table }), _jsx(MRT_ShowHideColumnsButton, { table: table }), _jsx(MRT_ToggleDensePaddingButton, { table: table }), _jsx(MRT_ToggleFullScreenButton, { table: table }), _jsx(Tooltip, { label: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435", children: _jsx(ActionIcon, { color: "gray", variant: "subtle", onClick: handleDecreaseFont, children: _jsx(IconTextDecrease, {}) }) }), _jsx(Tooltip, { label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", children: _jsx(ActionIcon, { color: "gray", mr: 'md', variant: "subtle", onClick: handleIncreaseFont, children: _jsx(IconTextIncrease, {}) }) })] }));
    };
    // #endregion
    if (validator && currentItem) {
        const statusValidation = validator.validate(currentItem);
        if (statusValidation != currentItemValid) {
            setCurrentItemValid(statusValidation);
            dispatchEvent(createDisabledSaveButtonEvent(!statusValidation));
        }
        const newHash = validator.validationStatus.hash();
        if (newHash != hashValid) {
            setHashValid(newHash);
        }
    }
    const table = useMantineReactTable({
        ...props,
        getRowId: (row) => row.id,
        columns: editColumns,
        layoutMode: 'grid',
        data: items,
        icons: actualIcons,
        localization: localizationFull,
        renderRowActions: props.renderRowActions ?? renderRowActionsEditRow,
        renderTopToolbarCustomActions: props.renderTopToolbarCustomActions ?? renderTopToolbarCustomActionsAddRow,
        renderToolbarInternalActions: renderToolbarInternalActions,
        rowCount: pageInfo.totalCount,
        state: {
            isLoading: isLoading,
            isSaving: isUpdatingProcess || isDeletingProcess,
            showProgressBars: isRefetching,
            showSkeletons: false,
            pagination: paginationModel,
            columnFilters: columnFiltersState,
            columnFilterFns: columnFiltersFns,
            globalFilter: globalFilter,
            sorting: sortingState
        },
        onColumnFilterFnsChange: handleColumnFilterFnsChange,
        onColumnFiltersChange: setColumnFiltersState,
        onEditingRowCancel: handleEditRowCancel,
        onEditingRowSave: handleEditRowSave,
        onCreatingRowSave: handleCreateRowSave,
        onCreatingRowCancel: handleCreateRowCancel,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPaginationModel,
        onSortingChange: setSortingState,
        mantineEditRowModalProps: ({ row }) => ({
            title: editItemName
        }),
        mantineCreateRowModalProps: ({ row }) => ({
            title: editItemName
        }),
        filterFns: {
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
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(MantineReactTable, { table: table }), _jsx(Modal, { centered: true, opened: openDeleteDialog, title: LocalizationCore.data.actions.delete, onClose: handleCloseDeleteDialog, children: _jsxs(VerticalStack, { spacing: 'md', children: [_jsx(Text, { children: deleteItemName }), _jsxs(HorizontalStack, { hAlign: "space-between", mb: "md", mt: "md", spacing: 'md', children: [_jsx(Button, { radius: "sm", variant: "default", w: '160px', onClick: handleCloseDeleteDialog, children: LocalizationCore.data.actions.cancel }), _jsx(Button, { color: redColor, radius: "sm", variant: "filled", w: '160px', onClick: handleOkDeleteDialogAsync, children: LocalizationCore.data.actions.delete })] })] }) }, 'deleteDialog')] }));
}
//# sourceMappingURL=TableView.js.map