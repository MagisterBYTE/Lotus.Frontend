export abstract class CharConstants
{
  /**
   * Неразрывный пробел (По ширине совпадает с межсловным пробелом.)
   * Мнемоника в HTML 4 - &nbsp;
   */
  public static readonly NonBreakingSpace: string = '\u00A0' as const;

  /**
   * Фигурный пробел (Имеет такую же ширину, что и цифры в данном шрифте, и предназначен для набора таблиц.)
   * Мнемоника в HTML 4 - &#x2007; или &#8199;
   */
  public static readonly FigureSpace: string = '\u2007' as const;

  /**
   * Узкий неразрывный пробел.
   * Мнемоника в HTML 4 - &#x202F; или &#8239;
   */
  public static readonly NarrowNoBreakSpace: string = '\u202F' as const;

  /**
   * Неразрывный пробел с нулевой шириной.
   * Мнемоника в HTML 4 - &#x2060; или &#8288;
   */
  public static readonly WordJoiner: string = '\u2060' as const;
}
