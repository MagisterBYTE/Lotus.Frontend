import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IRequest, IResponse, IResponsePage } from 'lotus-core/modules/requestAndResponse';
import { IEditable, TKey } from 'lotus-core/types';
import { ReactElement } from 'react';
import { MRT_TableOptions } from '#external/mantine-react-table';
export interface IFormCreatedItem<TItem extends Record<string, any> | null> {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
    onCreatedItem: (createdItem: TItem | null) => void;
}
export interface IFormDeletedItem<TItem extends Record<string, any> | null> {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    onDeleteItem: (createdItem: TItem | null) => void;
}
export interface ITableViewProps<TItem extends Record<string, any>> extends Omit<MRT_TableOptions<TItem>, 'columns' | 'data'> {
    objectInfo: IObjectInfo;
    onGetItems: <TFilterRequest extends IRequest>(filter: TFilterRequest) => Promise<IResponsePage<TItem>>;
    onTransformFilterRequest?: <TFilterRequest extends IRequest>(filter: TFilterRequest) => TFilterRequest;
    onAddItem?: () => Promise<IResponse<TItem>>;
    onUpdateItem?: (item: TItem) => Promise<IResponse<TItem>>;
    onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>;
    onDeleteItem?: (id: TKey) => Promise<IResponse>;
    formCreated?: (args: IFormCreatedItem<TItem | null>) => ReactElement;
    formDeleted?: (args: IFormDeletedItem<TItem | null>) => ReactElement;
}
export declare const TableView: <TItem extends Record<string, any> & IEditable>(props: ITableViewProps<TItem>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableView.d.ts.map