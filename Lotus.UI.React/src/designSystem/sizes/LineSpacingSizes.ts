import { instanceOfSizeType, TCssLineHeight } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';


/**
 * Размеры связанные с межстрочным интервалом
 */
export class LineSpacingSizes extends SizeDimensions
{
  // #region Const
  /**
   * Стандартные размеры межстрочного интервала
   */
  public static readonly Default = new LineSpacingSizes(0.5 * 16, 0.75 * 16, 0.875 * 16, 1 * 16, 1.25 * 16, 1.125 * 16, 1.25 * 16);
  // #endregion

  // #region Static methods
  /**
   * Получить значение межстрочного интервала через переменную Css
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   */
  public static getFromCssVariable(value?: string | number): TCssLineHeight | undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value / 16}rem`;

    if (instanceOfSizeType(value))
    {
      switch (value)
      {
        case 'xxs':
          return CssVariables.LineSpacingSizeXXS;
        case 'xs':
          return CssVariables.LineSpacingSizeXS;
        case 'sm':
          return CssVariables.LineSpacingSizeSM;
        case 'md':
          return CssVariables.LineSpacingSizeMD;
        case 'lg':
          return CssVariables.LineSpacingSizeLG;
        case 'xl':
          return CssVariables.LineSpacingSizeXL;
        case 'xxl':
          return CssVariables.LineSpacingSizeXXL;
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
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeXXS.match(CssVariables.RegExtractName)![0], this.xxs.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeXS.match(CssVariables.RegExtractName)![0], this.xs.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeSM.match(CssVariables.RegExtractName)![0], this.sm.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeMD.match(CssVariables.RegExtractName)![0], this.md.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeLG.match(CssVariables.RegExtractName)![0], this.lg.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeXL.match(CssVariables.RegExtractName)![0], this.xl.rem);
    document.documentElement.style.setProperty(CssVariables.LineSpacingSizeXXL.match(CssVariables.RegExtractName)![0], this.xxl.rem);
  }
}
