import { IGeneralBorderProperties, IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { TCssFlexGrow, TCssFlexShrink, TCssGridColumn, TCssGridRow, TCssHeight, TCssWidth } from '#types';

/**
 * Общие свойства элемента UI выступающего в качестве базового контейнера
 */
export interface IGeneralContainerProperties extends IGeneralMarginProperties, IGeneralPaddingProperties, IGeneralBorderProperties {
  /**
   * Ширина
   */
  w?: TCssWidth;

  /**
   * Высота
   */
  h?: TCssHeight;

  /**
   * Коэффициент растяжения при flex
   */
  grow?: TCssFlexGrow;

  /**
   * Коэффициент сжатия при flex
   */
  shrink?: TCssFlexShrink;

  /**
   * Индекс колонки при grid
   */
  gridColumn?: TCssGridColumn;

  /**
   * Количество колонок при grid
   */
  gridColumnSpan?: TCssGridColumn;

  /**
   * Индекс строки при grid
   */
  gridRow?: TCssGridRow;

  /**
   * Количество строк при grid
   */
  gridRowSpan?: TCssGridColumn;
}

export function getContainerProperties(props: IGeneralContainerProperties) 
{
  const { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb } = props;
  return { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb };
}
