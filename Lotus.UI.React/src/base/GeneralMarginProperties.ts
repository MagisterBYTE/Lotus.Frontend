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
    const { m, mt, mr, mb, ml } = props;

    if (!m && !mt && !mr && !mb && !ml)
    {
      return {};
    }

    const getValue = (specific?: TCssPadding | TSizeType) =>
    {
      const value = specific ?? m;
      return value ? MarginSizes.getFromCssVariable(value) : '0';
    };

    const top = getValue(mt);
    const right = getValue(mr);
    const bottom = getValue(mb);
    const left = getValue(ml);

    // Логика сокращения (Shorthand)
    let marginValue: string | undefined | number;

    if (top === right && right === bottom && bottom === left)
    {
      // Все стороны равны: margin: 10px;
      marginValue = top;
    }
    else if (top === bottom && right === left)
    {
      // Пары верх-низ и право-лево равны: margin: 10px 20px;
      marginValue = `${top} ${right}`;
    }
    else if (right === left)
    {
      // Право и лево равны: margin: 10px 20px 15px;
      marginValue = `${top} ${right} ${bottom}`;
    }
    else
    {
      // Все разные: margin: 10px 20px 15px 5px;
      marginValue = `${top} ${right} ${bottom} ${left}`;
    }

    return { margin: marginValue };
  }
}
