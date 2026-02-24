import { IObjectInfo, IPropertyDescriptor } from 'lotus-core/modules/objectInfo';
import { IValidator } from 'lotus-core/modules/validation';
import { IImageDatabase } from 'lotus-core/resources/image';
import { IRecordObject } from 'lotus-core/types';
import { ReactNode, RefObject } from 'react';
import { MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from '#external/mantine-react-table';
import { IContextRenderBase } from '#types';
export interface TableViewComponentProps<TItem extends IRecordObject> {
    cell: MRT_Cell<TItem, unknown>;
    column: MRT_Column<TItem, unknown>;
    renderedCellValue: number | ReactNode | string;
    renderedColumnIndex?: number;
    renderedRowIndex?: number;
    row: MRT_Row<TItem>;
    rowRef?: RefObject<HTMLTableRowElement>;
    table: MRT_TableInstance<TItem>;
    objectInfo: IObjectInfo;
    validator?: IValidator;
    property: IPropertyDescriptor;
    contextRender: IContextRenderBase;
    imageDatabase?: IImageDatabase;
}
//# sourceMappingURL=TableViewComponentProps.d.ts.map