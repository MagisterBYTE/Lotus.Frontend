import { TCssGap, TSizeTypes } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';

/**
 * Размеры связанные с расстоянием между элементами
 */
export class GapSizes extends SizeDimensions
{
  // #region Const
  /**
   * Стандартные расстояния между элементами
   */
  public static readonly Default = new GapSizes(0.15 * 16, 0.25 * 16, 0.375 * 16, 0.5 * 16, 1 * 16, 1.5 * 16, 2 * 16);
  // #endregion

  // #region Static methods
  /**
   * Получить значение расстояния через переменную Css
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   */
  public static getFromCssVariable(value?: string | number): TCssGap | undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value / 16}rem`;

    if (TSizeTypes.isSizeType(value))
    {
      switch (value)
      {
        case 'xxs':
          return CssVariables.GapSizeXXS;
        case 'xs':
          return CssVariables.GapSizeXS;
        case 'sm':
          return CssVariables.GapSizeSM;
        case 'md':
          return CssVariables.GapSizeMD;
        case 'lg':
          return CssVariables.GapSizeLG;
        case 'xl':
          return CssVariables.GapSizeXL;
        case 'xxl':
          return CssVariables.GapSizeXXL;
      }
    }

    return value;
  }
  // #endregion

  // eslint-disable-next-line max-params, @typescript-eslint/no-useless-constructor
  constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number)
  {
    super(xxs, xs, sm, md, lg, xl, xxl);
  }

  /**
   * Применить текущие значения размера к соответствующим переменным Css.
   */
  public override applyToCssVariable(): void
  {
    document.documentElement.style.setProperty(CssVariables.GapSizeXXS.match(CssVariables.RegExtractName)![0], this.xxs.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeXS.match(CssVariables.RegExtractName)![0], this.xs.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeSM.match(CssVariables.RegExtractName)![0], this.sm.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeMD.match(CssVariables.RegExtractName)![0], this.md.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeLG.match(CssVariables.RegExtractName)![0], this.lg.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeXL.match(CssVariables.RegExtractName)![0], this.xl.toRem());
    document.documentElement.style.setProperty(CssVariables.GapSizeXXL.match(CssVariables.RegExtractName)![0], this.xxl.toRem());
  }
}
