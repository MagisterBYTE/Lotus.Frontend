import { TCssPadding, TSizeTypes } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';

/**
 * Размеры связанные с внешним отступом
 */
export class PaddingSizes extends SizeDimensions
{
  // #region Const
  /**
   * Стандартные размеры внешнего отступа
   */
  public static readonly Default = new PaddingSizes(0.30 * 16, 0.5 * 16, 0.750 * 16, 1 * 16, 1.5 * 16, 2.0 * 16, 2.5 * 16);
  // #endregion

  // #region Static methods
  /**
   * Получить значение внешнего отступа через переменную Css
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   */
  public static getFromCssVariable(value?: string | number): TCssPadding | undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value / 16}rem`;

    if (TSizeTypes.isSizeType(value))
    {
      switch (value)
      {
        case 'xxs':
          return CssVariables.PaddingSizeXXS;
        case 'xs':
          return CssVariables.PaddingSizeXS;
        case 'sm':
          return CssVariables.PaddingSizeSM;
        case 'md':
          return CssVariables.PaddingSizeMD;
        case 'lg':
          return CssVariables.PaddingSizeLG;
        case 'xl':
          return CssVariables.PaddingSizeXL;
        case 'xxl':
          return CssVariables.PaddingSizeXXL;
      }
    }

    return value;
  }
  // #endregion

  // eslint-disable-next-line max-params, @typescript-eslint/no-useless-constructor
  constructor(xxs: number, xs: number, sm:number, md:number, lg:number, xl:number, xxl:number)
  {
    super(xxs, xs, sm, md, lg, xl, xxl);
  }

  /**
   * Применить текущие значения размера к соответствующим переменным Css.
   */
  public override applyToCssVariable(): void
  {
    document.documentElement.style.setProperty(CssVariables.PaddingSizeXXS.match(CssVariables.RegExtractName)![0], this.xxs.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeXS.match(CssVariables.RegExtractName)![0], this.xs.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeSM.match(CssVariables.RegExtractName)![0], this.sm.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeMD.match(CssVariables.RegExtractName)![0], this.md.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeLG.match(CssVariables.RegExtractName)![0], this.lg.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeXL.match(CssVariables.RegExtractName)![0], this.xl.toRem());
    document.documentElement.style.setProperty(CssVariables.PaddingSizeXXL.match(CssVariables.RegExtractName)![0], this.xxl.toRem());
  }
}
