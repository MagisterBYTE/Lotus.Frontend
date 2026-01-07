import { MarginSizes } from '#designSystem/sizes';
import { TCssPadding, TCssProperties, TSizeType } from '#types';

/**
 * Общие свойства внешних отступов элемента UI
 */
export interface IGeneralMarginProperties 
{
  /**
   * Внешний отступ
   */
  m?: TCssPadding | TSizeType;

  /**
   * Внешний отступ слева
   */
  ml?: TCssPadding | TSizeType;

  /**
   * Внешний отступ сверху
   */
  mt?: TCssPadding | TSizeType;

  /**
   * Внешний отступ справа
   */
  mr?: TCssPadding | TSizeType;

  /**
   * Внешний отступ снизу
   */
  mb?: TCssPadding | TSizeType;
}

/**
 * Вспомогательный класс для работы с внешними отступами элемента UI
 */
export abstract class MarginPropertiesHelper
{
  /**
   * Создать свойства CSS по внешнему отступу в виде TCssProperties
   * @param props Общие свойства внутренних отступов элемента UI
   * @returns Свойства CSS по внешнему отступу в виде TCssProperties
   */
  public static createMarginProps(props: IGeneralMarginProperties): TCssProperties
  {
    const marginProps: TCssProperties = {};

    if (props.m)
    {
      marginProps.margin = MarginSizes.getFromCssVariable(props.m);
    }
    else
    {
      marginProps.marginLeft = MarginSizes.getFromCssVariable(props.ml);
      marginProps.marginRight = MarginSizes.getFromCssVariable(props.mr);
      marginProps.marginTop = MarginSizes.getFromCssVariable(props.mt);
      marginProps.marginBottom = MarginSizes.getFromCssVariable(props.mb);
    }

    return marginProps;
  }
}