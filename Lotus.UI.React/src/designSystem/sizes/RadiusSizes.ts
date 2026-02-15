import { TCssBorderRadius, TSizeTypes } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';

/**
 * Размеры связанные с радиусом закругления
 */
export class RadiusSizes extends SizeDimensions 
{
  // #region Const
  /**
   * Стандартные радиусы закругления
   */
  public static readonly Default = new RadiusSizes(0.15 * 16, 0.25 * 16, 0.375 * 16, 0.5 * 16, 0.75 * 16, 1.0 * 16, 1.25 * 16);
  // #endregion

  // #region Static methods
  /**
   * Получить значение радиуса закругления через переменную Css
   * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
   */
  public static getFromCssVariable(value?: string | number): TCssBorderRadius | undefined
  {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value / 16}rem`;

    if (TSizeTypes.isSizeType(value))
    {
      switch (value)
      {
        case 'xxs':
          return CssVariables.RadiusSizeXXS;
        case 'xs':
          return CssVariables.RadiusSizeXS;
        case 'sm':
          return CssVariables.RadiusSizeSM;
        case 'md':
          return CssVariables.RadiusSizeMD;
        case 'lg':
          return CssVariables.RadiusSizeLG;
        case 'xl':
          return CssVariables.RadiusSizeXL;
        case 'xxl':
          return CssVariables.RadiusSizeXXL;
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
   * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс {@link CssVariables}
   */
  public override applyToCssVariable(): void
  {
    document.documentElement.style.setProperty(CssVariables.RadiusSizeXXS.match(CssVariables.RegExtractName)![0], this.xxs.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeXS.match(CssVariables.RegExtractName)![0], this.xs.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeSM.match(CssVariables.RegExtractName)![0], this.sm.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeMD.match(CssVariables.RegExtractName)![0], this.md.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeLG.match(CssVariables.RegExtractName)![0], this.lg.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeXL.match(CssVariables.RegExtractName)![0], this.xl.toRem());
    document.documentElement.style.setProperty(CssVariables.RadiusSizeXXL.match(CssVariables.RegExtractName)![0], this.xxl.toRem());
  }
}
