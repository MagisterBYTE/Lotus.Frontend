import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { ActionIcon, Button, Modal, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCircleX, IconDeviceFloppy, IconEdit, IconTextDecrease, IconTextIncrease } from '@tabler/icons-react';
import { StringHelper } from 'lotus-core/helpers';
import { LocalizationCore } from 'lotus-core/localization';
import { ObjectInfo } from 'lotus-core/modules/objectInfo';
import { ResponseHelper } from 'lotus-core/modules/requestAndResponse';
import { Assert, ObjectName } from 'lotus-core/utils';
import { useEffect, useMemo, useState } from 'react';
import { Primitive } from '#components/Common';
import { Text } from '#components/Display';
import { HorizontalStack, VerticalStack } from '#components/Layout';
import { ImageGallery, MultiSelect, Select } from '#components/Selects';
import { MantineReactTable, useMantineReactTable, createRow, MRT_ToggleGlobalFilterButton, MRT_ToggleFiltersButton, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton } from '#external/mantine-react-table';
import { TSizeTypes } from '#types';
import { MantineReactTableHelper } from './MantineReactTableHelper';
import { createDisabledSaveButtonEvent } from './TableViewEvents';
import { EditTableFilterArray, EditTableFilterEnum, EditTableFilterEnumNull, EditTableFilterNumber, EditTableFilterNumberNull, EditTableFilterString } from './TableViewFilterTypes';
import { TableViewMultiSelectView } from './components/TableViewMultiSelectView';
import { TableViewSelectView } from './components/TableViewSelectView';
import { TableViewTextView } from './components/TableViewTextView';
import { useTableViewLocalization } from './useTableViewLocalization';
const pageInfoResponseDefault = { pageNumber: 0, pageSize: 10, currentPageSize: 10, totalCount: 10 };
export function TableView(props) {
    const { size = 'md', objectInfo, validator, onGetItems, onTransformFilterRequest, onAddItem, onCreateItem, onUpdateItem, onDuplicateItem, onDeleteItem, imageDatabase } = props;
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
    const [creatingStatus, setCreatingStatus] = useState(false);
    // Удаление
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItem, setDeleteItem] = useState(undefined);
    const [deleteItemName, setDeleteItemName] = useState('');
    const [isDeletingProcess, setDeletingProcess] = useState(false);
    // Локализация
    const localizationFull = useTableViewLocalization();
    // Текущий контекст ренденинга
    const contextRender = { disabled: props.disabled, size: actualSize, theme: theme };
    const CellViewText = (propsComponent) => (_jsx(TableViewTextView, { ...propsComponent.tableProps, contextRender: contextRender, imageDatabase: imageDatabase, objectInfo: objectInfo, property: propsComponent.property, validator: validator }));
    const CellViewSelect = (propsComponent) => (_jsx(TableViewSelectView, { ...propsComponent.tableProps, contextRender: contextRender, imageDatabase: imageDatabase, objectInfo: objectInfo, property: propsComponent.property, validator: validator }));
    const CellViewMulti = (propsComponent) => (_jsx(TableViewMultiSelectView, { ...propsComponent.tableProps, contextRender: contextRender, imageDatabase: imageDatabase, objectInfo: objectInfo, property: propsComponent.property, validator: validator }));
    const CellEditText = (propsComponent) => {
        const { column, property } = propsComponent;
        // Режим редактирования
        column.mantineEditTextInputProps = {
            required: property.editing?.required,
            disabled: props.disabled,
            size: actualSize,
            type: 'text',
            error: validator?.validationStatus.getErrorByKey(property.fieldName),
            onChange: (event) => {
                const newItem = ObjectInfo.updatedObject(currentItem, property, event.target.value);
                setCurrentItem(newItem);
            },
            ...property.visualSettings?.propsEdit
        };
    };
    const CellEditSelect = (propsComponent) => {
        const { tableProps, property } = propsComponent;
        const { cell, row, column } = tableProps;
        const selectedValue = currentItem ? String(currentItem[property.fieldName]) : String(cell.getValue());
        const items = property.possibleValues;
        const isModalMode = creatingStatus ? (table.options.createDisplayMode === 'modal') : (table.options.editDisplayMode === 'modal');
        return (_jsx(Select, { disabled: props.disabled, error: validator?.validationStatus.getErrorByKey(property.fieldName), imageDatabase: imageDatabase, items: items, label: isModalMode ? property.name : undefined, required: isModalMode ? property.editing?.required : undefined, selectedItem: selectedValue, selectProps: {
                withAlignedLabels: true,
                withCheckIcon: true,
                onChange: (value) => {
                    const newItem = ObjectInfo.updatedObject(currentItem, property, value);
                    setCurrentItem(newItem);
                    row._valuesCache[column.id] = value;
                }
            }, size: actualSize, w: '100%', ...property.visualSettings?.propsEdit }));
    };
    const CellEditMulti = (propsComponent) => {
        const { tableProps, property } = propsComponent;
        const { cell, row, column } = tableProps;
        const selectedValues = currentItem ? currentItem[property.fieldName] : cell.getValue();
        const items = property.possibleValues;
        const isModalMode = creatingStatus ? (table.options.createDisplayMode === 'modal') : (table.options.editDisplayMode === 'modal');
        return (_jsx(MultiSelect, { disabled: props.disabled, error: validator?.validationStatus.getErrorByKey(property.fieldName), imageDatabase: imageDatabase, items: items, label: isModalMode ? property.name : undefined, required: isModalMode ? property.editing?.required : undefined, selectedItems: selectedValues, selectProps: {
                withAlignedLabels: true,
                withCheckIcon: true,
                onChange: (value) => {
                    const newItem = ObjectInfo.updatedObject(currentItem, property, value);
                    setCurrentItem(newItem);
                    row._valuesCache[column.id] = value;
                }
            }, size: actualSize, w: "100%", ...property.visualSettings?.propsEdit }));
    };
    // Модифицированные столбцы
    const editColumns = useMemo(() => 
    // eslint-disable-next-line complexity
    properties.map((property) => {
        const column = MantineReactTableHelper.convertPropertyDescriptorToColumn(property);
        // Проверяем специальные свойства
        if (property.viewImage) {
            // eslint-disable-next-line react/display-name
            column.Cell = function ({ cell, row }) {
                const icon = cell.getValue();
                return _jsx(Primitive.Image, { icon: icon, iconSize: actualSize, ...property.visualSettings?.propsView });
            };
            if (property.editing?.enabled) {
                // eslint-disable-next-line react/display-name
                column.Edit = function ({ cell, row }) {
                    const icon = cell.getValue();
                    return (_jsx(ImageGallery, { imageDatabase: imageDatabase, selectedImage: icon, selectRenderComponent: true, size: actualSize, ...property.visualSettings?.propsEdit, onChangedItem: (image) => {
                            const newItem = ObjectInfo.updatedObject(currentItem, property, image?.source);
                            setCurrentItem(newItem);
                            // @ts-expect-error row._valuesCache
                            row._valuesCache[column.id] = image?.source;
                        } }));
                };
            }
            return column;
        }
        const isLink = Assert.existValue(property.possibleValues);
        switch (property.propertyTypeDesc.type) {
            case 'string':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // Данные есть - в режиме Multi
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewMulti, { property: property, tableProps: props });
                        }
                        else {
                            // Данные нет - в режиме Text
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // multi-select (по умолчанию редактор)
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterString(column, onSelectFilterMode);
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewSelect, { property: property, tableProps: props });
                        }
                        else {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // text (по умолчанию редактор)
                            if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) {
                                CellEditText({ property: property, tableProps: {}, column: column });
                            }
                            // select (может быть если указан прямо)
                            if (property.editing?.editorType === 'select') {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditSelect, { property: property, tableProps: props });
                            }
                        }
                    }
                }
                break;
            case 'bool':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        //
                        // Отображение
                        //
                        // eslint-disable-next-line react/display-name
                        column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // multi-select
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        if (property.isNullable) {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                        }
                        else {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                        }
                        //
                        // Отображение
                        //
                        // eslint-disable-next-line react/display-name
                        column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            /* empty */
                        }
                    }
                }
                break;
            case 'int':
            case 'long':
            case 'float':
            case 'double':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        if (isLink) {
                            // Данные есть - в режиме Multi
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewMulti, { property: property, tableProps: props });
                        }
                        else {
                            // Данные нет - в режиме Text
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // multi-select (по умолчанию)
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        if (property.isNullable) {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumberNull(column, onSelectFilterMode);
                        }
                        else {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumber(column, onSelectFilterMode);
                        }
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewSelect, { property: property, tableProps: props });
                        }
                        else {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // text (по умолчанию редактор)
                            if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) {
                                CellEditText({ property: property, tableProps: {}, column: column });
                            }
                            // select (может быть если указан прямо)
                            if (property.editing?.editorType === 'select') {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditSelect, { property: property, tableProps: props });
                            }
                        }
                    }
                }
                break;
            case 'enum':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // Данные есть - в режиме Multi
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewMulti, { property: property, tableProps: props });
                        }
                        else {
                            // Данные нет - в режиме Text хотя enun не может
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // Только в режиме multi-select (по умолчанию редактор)
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        if (property.isNullable) {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                        }
                        else {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                        }
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewSelect, { property: property, tableProps: props });
                        }
                        else {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // select (по умолчанию редактор)
                            if (property.editing?.editorType === 'select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditSelect, { property: property, tableProps: props });
                            }
                            // text (может быть если указан прямо указан)
                            if (property.editing?.editorType === 'text') {
                                CellEditText({ property: property, tableProps: {}, column: column });
                            }
                        }
                    }
                }
                break;
            case 'dateTime':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        if (isLink) {
                            // Данные есть - в режиме Multi
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewMulti, { property: property, tableProps: props });
                        }
                        else {
                            // Данные нет - в режиме Text
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // multi-select (по умолчанию)
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        if (property.isNullable) {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumberNull(column, onSelectFilterMode);
                        }
                        else {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterNumber(column, onSelectFilterMode);
                        }
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewSelect, { property: property, tableProps: props });
                        }
                        else {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // text (по умолчанию редактор)
                            if (property.editing?.editorType === 'text' || Assert.emptyValue(property.editing?.editorType)) {
                                CellEditText({ property: property, tableProps: {}, column: column });
                            }
                            // select (может быть если указан прямо)
                            if (property.editing?.editorType === 'select') {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditSelect, { property: property, tableProps: props });
                            }
                        }
                    }
                }
                break;
            case 'guid':
                {
                    if (property.isArray) {
                        //
                        // Массив фильтров
                        //
                        column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterArray(column, onSelectFilterMode);
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // Данные есть - в режиме Multi
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewMulti, { property: property, tableProps: props });
                        }
                        else {
                            // Данные нет - в режиме Text хотя enun не может
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // Только в режиме multi-select (по умолчанию редактор)
                            if (property.editing?.editorType === 'multi-select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditMulti, { property: property, tableProps: props });
                            }
                        }
                    }
                    else {
                        //
                        // Массив фильтров
                        //
                        if (property.isNullable) {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnumNull(column, onSelectFilterMode);
                        }
                        else {
                            column.renderColumnFilterModeMenuItems = ({ column, onSelectFilterMode }) => EditTableFilterEnum(column, onSelectFilterMode);
                        }
                        //
                        // Отображение
                        //
                        if (isLink) {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewSelect, { property: property, tableProps: props });
                        }
                        else {
                            // eslint-disable-next-line react/display-name
                            column.Cell = (props) => _jsx(CellViewText, { property: property, tableProps: props });
                        }
                        //
                        // Редактирование
                        //
                        if (property.editing?.enabled) {
                            // select (по умолчанию редактор)
                            if (property.editing?.editorType === 'select' || Assert.emptyValue(property.editing?.editorType)) {
                                // eslint-disable-next-line react/display-name
                                column.Edit = (props) => _jsx(CellEditSelect, { property: property, tableProps: props });
                            }
                            // text (может быть если указан прямо указан)
                            if (property.editing?.editorType === 'text') {
                                CellEditText({ property: property, tableProps: {}, column: column });
                            }
                        }
                    }
                }
                break;
        }
        return column;
    }), [hashValid, currentItem, actualSize, creatingStatus]);
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
                setCreatingStatus(true);
            }
        }
        else {
            setCurrentItem(undefined);
            table.setCreatingRow(true);
            setCreatingStatus(true);
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
        setCreatingStatus(false);
    };
    const handleCreateRowCancel = (props) => {
        setCurrentItem(undefined);
        setCreatingStatus(false);
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
    useEffect(() => {
        if (validator && currentItem) {
            const statusValidation = validator.validate(currentItem);
            // 1. Проверяем изменение статуса валидности
            if (statusValidation !== currentItemValid) {
                setCurrentItemValid(statusValidation);
                // Теперь событие отправляется ПОСЛЕ рендеринга
                window.dispatchEvent(createDisabledSaveButtonEvent(!statusValidation));
            }
            // 2. Проверяем изменение хеша
            const newHash = validator.validationStatus.hash();
            if (newHash !== hashValid) {
                setHashValid(newHash);
            }
        }
    }, [currentItem, validator, currentItemValid, hashValid]);
    // #endregion
    //
    // #region Render
    //
    const renderRowActionsEditRow = (props) => {
        return (_jsxs(HorizontalStack, { spacing: actualSize, children: [isUpdate && (_jsx(Tooltip, { label: LocalizationCore.data.actions.edit, children: _jsx(ActionIcon, { size: TSizeTypes.next(actualSize, 1, 'xl'), variant: "default", onClick: handleEditRowBegin(props), children: _jsx(IconEdit, { color: blueColor, height: '100%', width: '100%' }) }) })), isDelete && (_jsx(Tooltip, { label: LocalizationCore.data.actions.delete, children: _jsx(ActionIcon, { size: TSizeTypes.next(actualSize, 1, 'xl'), variant: "default", onClick: handleDeleteRow(props.row), children: _jsx(IconCircleX, { color: redColor, height: '100%', width: '100%' }) }) }))] }));
    };
    const renderTopToolbarCustomActionsAddRow = (props) => {
        return (_jsx(Button, { m: "md", onClick: handleCreateRowBeginAsync, children: LocalizationCore.data.actions.add }));
    };
    const renderToolbarInternalActions = (props) => {
        return (_jsxs(_Fragment, { children: [_jsx(MRT_ToggleGlobalFilterButton, { table: table }), _jsx(MRT_ToggleFiltersButton, { table: table }), _jsx(MRT_ShowHideColumnsButton, { table: table }), _jsx(MRT_ToggleDensePaddingButton, { table: table }), _jsx(MRT_ToggleFullScreenButton, { table: table }), _jsx(Tooltip, { label: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435", children: _jsx(ActionIcon, { color: "gray", variant: "subtle", onClick: handleDecreaseFont, children: _jsx(IconTextDecrease, {}) }) }), _jsx(Tooltip, { label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", children: _jsx(ActionIcon, { color: "gray", mr: 'md', variant: "subtle", onClick: handleIncreaseFont, children: _jsx(IconTextIncrease, {}) }) })] }));
    };
    // #endregion
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
        mantineFilterMultiSelectProps: { size: actualSize },
        mantineFilterSelectProps: { size: actualSize },
        mantineFilterTextInputProps: { size: actualSize },
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