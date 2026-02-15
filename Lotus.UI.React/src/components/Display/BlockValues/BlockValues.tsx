import { Assert } from 'lotus-core/utils';
import { Grid, IGridProps } from '#components/Layout';
import { TOrientation, TSizeType } from '#types';
import { BlockValue, IBlockValueProps } from '../BlockValue/BlockValue';

export interface IBlockValuesProps extends IGridProps
{
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

export function BlockValues(props: IBlockValuesProps)
{
  const { size = 'md', blockValueProps, blockValues, rowCount, columnCount, placement, ...gridProps } = props;

  if (Assert.emptyValue(gridProps.gridTemplateRows))
  {
    gridProps.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
  }

  if (Assert.emptyValue(gridProps.gridTemplateColumns))
  {
    gridProps.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
  }

  const getGridColumnIndex = (index: number) =>
  {
    if (placement === 'horizontal')
    {
      // Горизонтальное заполнение: слева направо, затем следующая строка
      const col = (index % columnCount) + 1;
      return Math.min(col, columnCount);
    }
    else
    {
      // Вертикальное заполнение: сверху вниз, затем следующий столбец
      const col = Math.floor(index / rowCount) + 1;
      return Math.min(col, columnCount);
    }
  };

  const getGridRowIndex = (index: number) =>
  {
    if (placement === 'horizontal')
    {
      // Горизонтальное заполнение
      const row = Math.floor(index / columnCount) + 1;
      return Math.min(row, rowCount);
    }
    else
    {
      // Вертикальное заполнение
      const row = (index % rowCount) + 1;
      return Math.min(row, rowCount);
    }
  };

  const renderItem = (block: Partial<IBlockValueProps>, index: number) =>
  {
    return (
      <BlockValue
        key={index}
        accentColor={block.accentColor ?? blockValueProps?.accentColor}
        asBadge={block.asBadge ?? blockValueProps?.asBadge}
        gridColumn={block.gridColumn ?? getGridColumnIndex(index)}
        gridRow={block.gridRow ?? getGridRowIndex(index)}
        label={block.label ?? ''}
        labelProps={block.labelProps ?? blockValueProps?.labelProps}
        monospaceValue={block.monospaceValue ?? blockValueProps?.monospaceValue}
        size={block.size ?? size}
        value={block.value ?? ''}
        valueProps={block.valueProps ?? blockValueProps?.valueProps}
        {...blockValueProps}
      />
    );
  };

  return <Grid {...gridProps}> {blockValues.map((block, index) => renderItem(block, index))} </Grid>;
}
