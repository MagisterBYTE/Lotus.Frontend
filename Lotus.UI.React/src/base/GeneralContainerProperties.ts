import { CSSProperties } from 'react';
import { IGeneralBorderProperties, IGeneralMarginProperties, IGeneralPaddingProperties } from '#base';
import { GapSizes } from '#designSystem/sizes';
import
{
  TCssAlignItems,
  TCssFlexGrow,
  TCssFlexShrink,
  TCssGap,
  TCssGridColumn,
  TCssGridRow,
  TCssHeight,
  TCssJustifyContent,
  TCssProperties,
  TCssWidth,
  TSizeType
} from '#types';

/**
 * Общие свойства элемента UI выступающего в качестве базового контейнера
 */
export interface IGeneralContainerProperties extends IGeneralMarginProperties, IGeneralPaddingProperties, IGeneralBorderProperties
{
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

/**
 * Вспомогательный класс для работы с общими свойства элемента UI выступающего в качестве базового контейнера
 */
export abstract class ContainerPropertiesHelper
{
  // #region Common
  /**
   * Получить стандартные свойства контейнера
   * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
   * @returns Стандартные свойства контейнера
   */
  public static getContainerProperties(props: IGeneralContainerProperties)
  {
    const { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb } = props;
    return { w, h, p, pl, pt, pr, pb, m, ml, mt, mr, mb };
  }
  // #endregion

  // #region Container
  /**
   * Создать свойства CSS по контейнеру в виде TCssProperties
   * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
   * @returns Свойства CSS по контейнеру в виде TCssProperties
   */
  public static createContainerProps(props: IGeneralContainerProperties): TCssProperties
  {
    const containerProps: TCssProperties = {};

    if (props.w)
    {
      containerProps.width = props.w;
    }
    if (props.h)
    {
      containerProps.height = props.h;
    }

    if (props.grow)
    {
      containerProps.flexGrow = props.grow;
    }
    if (props.shrink)
    {
      containerProps.flexShrink = props.shrink;
    }

    return containerProps;
  }
  // #endregion

  // #region FlexContainer
  /**
   * Получить оптимальные настройки Flex контейнера по горизонтали в виде CSSProperties
   * @param padding Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param horizontalAlign Распределение элементов по ширине
   * @param verticalAlign Выравнивание элементов по вертикали
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexRowContainer(
    padding: TSizeType | TCssGap,
    isReverse: boolean = false,
    horizontalAlign: TCssJustifyContent = 'flex-start',
    verticalAlign: TCssAlignItems = 'center'
  ): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: isReverse ? 'row-reverse' : 'row',
      justifyContent: horizontalAlign,
      alignItems: verticalAlign,
      columnGap: GapSizes.getFromCssVariable(padding)
    };
  }

  /**
   * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
   * @param designSystem Дизайн-система
   * @param padding Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param verticalAlign Распределение элементов по высоте
   * @param horizontalAlign Выравнивание элементов по горизонтали
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexColumnContainer(
    padding: TSizeType | TCssGap,
    isReverse: boolean = false,
    verticalAlign: TCssJustifyContent = 'flex-start',
    horizontalAlign: TCssAlignItems = 'center'
  ): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: isReverse ? 'column-reverse' : 'column',
      justifyContent: verticalAlign,
      alignItems: horizontalAlign,
      rowGap: GapSizes.getFromCssVariable(padding)
    };
  }
  // #endregion
}
