import { IObjectInfo } from 'lotus-core/modules/objectInfo';
import { IRequest, IResponse, IResponsePage } from 'lotus-core/modules/requestAndResponse';
import { IEditable, IRecordObject, TKey } from 'lotus-core/types';
import { JSX } from 'react/jsx-runtime';
import { MRT_TableOptions } from '#external/mantine-react-table';
export interface ITableViewProps<TItem extends IRecordObject> extends Omit<MRT_TableOptions<TItem>, 'columns' | 'data'> {
    objectInfo: IObjectInfo;
    onGetItems: <TFilterRequest extends IRequest>(filter: TFilterRequest) => Promise<IResponsePage<TItem>>;
    onTransformFilterRequest?: <TFilterRequest extends IRequest>(filter: TFilterRequest) => TFilterRequest;
    onAddItem?: () => Promise<IResponse<TItem>>;
    onUpdateItem?: (item: TItem) => Promise<IResponse<TItem>>;
    onDuplicateItem?: (id: TKey) => Promise<IResponse<TItem>>;
    onDeleteItem?: (id: TKey) => Promise<IResponse>;
}
export declare const TableView: <TItem extends Record<string, any> & IEditable>(props: ITableViewProps<TItem>) => JSX.Element;
//# sourceMappingURL=TableView.d.ts.map