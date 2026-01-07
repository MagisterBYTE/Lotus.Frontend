import { SizeDimensions } from './SizeDimensions';

/**
 * Размеры связанные c иконкой
 */
export class IconSizes extends SizeDimensions 
{
  // #region Const
  /**
   * Стандартные размеры иконок
   */
  public static readonly Default = new IconSizes(12, 15, 20, 24, 28, 36, 42);
  // #endregion

  // eslint-disable-next-line max-params, @typescript-eslint/no-useless-constructor
  constructor(xxs: number, xs: number, sm:number, md:number, lg:number, xl:number, xxl:number)
  {
    super(xxs, xs, sm, md, lg, xl, xxl);
  }

  /**
   * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public override applyToCssVariable(): void
  {
  }
}
