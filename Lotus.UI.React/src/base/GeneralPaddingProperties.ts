import { PaddingSizes } from '#designSystem/sizes';
import { TCssPadding, TCssProperties, TSizeType } from '#types';

/**
 * Общие свойства внутренних отступов элемента UI
 */
export interface IGeneralPaddingProperties
{
  /**
   * Внутренний отступ
   */
  p?: TCssPadding | TSizeType;

  /**
   * Внутренний отступ слева
   */
  pl?: TCssPadding | TSizeType;

  /**
   * Внутренний отступ сверху
   */
  pt?: TCssPadding | TSizeType;

  /**
   * Внутренний отступ справа
   */
  pr?: TCssPadding | TSizeType;

  /**
   * Внутренний отступ снизу
   */
  pb?: TCssPadding | TSizeType;
}

/**
 * Вспомогательный класс для работы с внутренними отступами элемента UI
 */
export abstract class PaddingPropertiesHelper
{
  /**
   * Создать свойства CSS по внутреннему отступу в виде TCssProperties
   * @param props Общие свойства внутренних отступов элемента UI
   * @returns Свойства CSS по внутреннему отступу в виде TCssProperties
   */
  public static createPaddingProps(props: IGeneralPaddingProperties): TCssProperties
  {
    const { p, pt, pr, pb, pl } = props;

    // Если ничего не передано, возвращаем пустой объект
    if (!p && !pt && !pr && !pb && !pl)
    {
      return {};
    }

    /**
     * Вспомогательная функция получения значения стороны.
     * Приоритет: конкретное свойство (pt, pr...) > общее свойство (p) > '0'
     */
    const getValue = (specific?: TCssPadding | TSizeType) =>
    {
      const value = specific ?? p;
      return value ? PaddingSizes.getFromCssVariable(value) : '0';
    };

    const top = getValue(pt);
    const right = getValue(pr);
    const bottom = getValue(pb);
    const left = getValue(pl);

    let paddingValue: string | undefined | number;

    // Алгоритм сокращения (Shorthand)
    if (top === right && right === bottom && bottom === left)
    {
      // Все стороны равны: padding: 10px;
      paddingValue = top;
    }
    else if (top === bottom && right === left)
    {
      // Симметрия по вертикали и горизонтали: padding: 10px 20px;
      paddingValue = `${top} ${right}`;
    }
    else if (right === left)
    {
      // Симметрия только по бокам: padding: 10px 20px 5px;
      paddingValue = `${top} ${right} ${bottom}`;
    }
    else
    {
      // Все стороны разные: padding: 10px 15px 5px 8px;
      paddingValue = `${top} ${right} ${bottom} ${left}`;
    }

    return {
      padding: paddingValue
    };
  }
}
