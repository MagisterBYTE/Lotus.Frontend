import { IGridProps } from '#components/Layout';
import { TOrientation, TSizeType } from '#types';
import { IBlockValueProps } from '../BlockValue/BlockValue';
export interface IBlockValuesProps extends IGridProps {
    /**
     * Размер элемента
     */
    size?: TSizeType;
    /**
     * Свойства значений
     */
    blockValueProps?: Partial<IBlockValueProps>;
    /**
     * Список значений
     */
    blockValues: Partial<IBlockValueProps>[];
    /**
     * Количество строк в сетки
     */
    rowCount: number;
    /**
     * Количество столбцов в сетки
     */
    columnCount: number;
    /**
     * Расположение элементов
     */
    placement: TOrientation;
}
export declare function BlockValues(props: IBlockValuesProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BlockValues.d.ts.map