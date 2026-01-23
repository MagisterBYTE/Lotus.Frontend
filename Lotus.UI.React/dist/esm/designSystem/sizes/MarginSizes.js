import { instanceOfSizeType } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с внутренним отступом
 */
export class MarginSizes extends SizeDimensions {
    // #region Const
    /**
     * Стандартные размеры внутреннего отступа
     */
    static Default = new MarginSizes(0.30 * 16, 0.5 * 16, 0.750 * 16, 1 * 16, 1.5 * 16, 2.0 * 16, 2.5 * 16);
    // #endregion
    // #region Static methods
    /**
     * Получить значение внутреннего отступа через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return `${value / 16}rem`;
        if (instanceOfSizeType(value)) {
            switch (value) {
                case 'xxs':
                    return CssVariables.MarginSizeXXS;
                case 'xs':
                    return CssVariables.MarginSizeXS;
                case 'sm':
                    return CssVariables.MarginSizeSM;
                case 'md':
                    return CssVariables.MarginSizeMD;
                case 'lg':
                    return CssVariables.MarginSizeLG;
                case 'xl':
                    return CssVariables.MarginSizeXL;
                case 'xxl':
                    return CssVariables.MarginSizeXXL;
            }
        }
        return value;
    }
    // #endregion
    // eslint-disable-next-line max-params, @typescript-eslint/no-useless-constructor
    constructor(xxs, xs, sm, md, lg, xl, xxl) {
        super(xxs, xs, sm, md, lg, xl, xxl);
    }
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable() {
        document.documentElement.style.setProperty(CssVariables.MarginSizeXXS.match(CssVariables.RegExtractName)[0], this.xxs.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeXS.match(CssVariables.RegExtractName)[0], this.xs.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeSM.match(CssVariables.RegExtractName)[0], this.sm.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeMD.match(CssVariables.RegExtractName)[0], this.md.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeLG.match(CssVariables.RegExtractName)[0], this.lg.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeXL.match(CssVariables.RegExtractName)[0], this.xl.toRem());
        document.documentElement.style.setProperty(CssVariables.MarginSizeXXL.match(CssVariables.RegExtractName)[0], this.xxl.toRem());
    }
}
//# sourceMappingURL=MarginSizes.js.map