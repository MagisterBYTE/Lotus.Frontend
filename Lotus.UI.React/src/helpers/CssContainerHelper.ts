import { CSSProperties } from 'react';
import { IGeneralContainerProperties } from '#base';
import { CssPropertiesHelper, CssSpacingHelper } from '#helpers';
import { TCssAlignItems, TCssGap, TCssJustifyContent, TCssProperties, TElementSpacing } from '#types';

export abstract class CssContainerHelper 
{
  // #region Container
  /**
   * Заполнить свойства CSS по контейнеру в виде TCssProperties
   * @param style Текущие свойства
   * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
   * @param override Перезаписать если эти свойства уже есть
   * @returns Свойства CSS по контейнеру в виде TCssProperties
   */
  public static fillContainerProps(style: TCssProperties, props: IGeneralContainerProperties, override: boolean): TCssProperties 
  {
    CssPropertiesHelper.overrideStyleValue(style, 'width', props.w, override);
    CssPropertiesHelper.overrideStyleValue(style, 'height', props.h, override);
    CssPropertiesHelper.overrideStyleValue(style, 'flexGrow', props.grow, override);
    CssPropertiesHelper.overrideStyleValue(style, 'flexShrink', props.shrink, override);

    if (props.gridColumn && props.gridColumnSpan) 
    {
      CssPropertiesHelper.overrideStyleValue(style, 'gridColumnStart', props.gridColumn, override);
      CssPropertiesHelper.overrideStyleValue(style, 'gridColumnEnd', props.gridColumnSpan, override);
    }
    else 
    {
      if (props.gridColumn) 
      {
        CssPropertiesHelper.overrideStyleValue(style, 'gridColumnStart', props.gridColumn, override);
        if (typeof props.gridColumn === 'number') 
        {
          CssPropertiesHelper.overrideStyleValue(style, 'gridColumnEnd', props.gridColumn + 1, override);
        }
      }
    }

    if (props.gridRow && props.gridRowSpan) 
    {
      CssPropertiesHelper.overrideStyleValue(style, 'gridRowStart', props.gridRow, override);
      CssPropertiesHelper.overrideStyleValue(style, 'gridRowEnd', props.gridRowSpan, override);
    }
    else 
    {
      if (props.gridColumn) 
      {
        CssPropertiesHelper.overrideStyleValue(style, 'gridRowStart', props.gridRow, override);
        if (typeof props.gridRow === 'number') 
        {
          CssPropertiesHelper.overrideStyleValue(style, 'gridRowEnd', props.gridRow + 1, override);
        }
      }
    }

    return style;
  }

  /**
   * Получить свойства CSS по контейнеру в виде TCssProperties
   * @param props Общие свойства элемента UI выступающего в качестве базового контейнера
   * @returns Свойства CSS по контейнеру в виде TCssProperties
   */
  public static getContainerProps(props: IGeneralContainerProperties): TCssProperties 
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
    padding: TElementSpacing | TCssGap,
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
      columnGap: CssSpacingHelper.getGapPropsValue(padding)
    };
  }

  /**
   * Получить оптимальные настройки Flex контейнера по вертикали в виде CSSProperties
   * @param padding Внутренний отступ
   * @param isReverse Обратный порядок элементов
   * @param verticalAlign Распределение элементов по высоте
   * @param horizontalAlign Выравнивание элементов по горизонтали
   * @returns Настройки Flex контейнера в виде CSSProperties
   */
  public static getFlexColumnContainer(
    padding: TElementSpacing | TCssGap,
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
      rowGap: CssSpacingHelper.getGapPropsValue(padding)
    };
  }
  // #endregion
}
