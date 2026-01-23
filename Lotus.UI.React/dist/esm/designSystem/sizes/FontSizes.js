import { instanceOfSizeType } from '#types';
import { CssVariables } from '../сssVariables';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные со шрифтами
 */
export class FontSizes extends SizeDimensions {
    // #region Const
    /**
     * Стандартные размеры шрифтов
     */
    static Default = new FontSizes(0.5 * 16, 0.75 * 16, 0.875 * 16, 1 * 16, 1.125 * 16, 1.25 * 16, 1.5 * 16);
    // #endregion
    // #region Static methods
    /**
     * Получает корневой размер шрифта (font-size) документа
     * @returns число - размер шрифта html элемента в пикселях
     */
    static getRootFontSize() {
        // Проверяем, доступен ли window (защита от Server-Side Rendering)
        if (typeof window === 'undefined') {
            // На сервере возвращаем стандартное значение 16px
            return 16;
        }
        // Получаем вычисленный стиль корневого элемента (html)
        const rootFontSize = getComputedStyle(document.documentElement)
            .fontSize // Получаем значение в формате "16px"
            .replace('px', ''); // Удаляем "px" чтобы получить чистое число
        // Парсим число и возвращаем, или 16 по умолчанию при ошибке
        return parseFloat(rootFontSize) || 16;
    }
    /**
     * Получить значение шрифта через переменную Css
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
                    return CssVariables.FontSizeXXS;
                case 'xs':
                    return CssVariables.FontSizeXS;
                case 'sm':
                    return CssVariables.FontSizeSM;
                case 'md':
                    return CssVariables.FontSizeMD;
                case 'lg':
                    return CssVariables.FontSizeLG;
                case 'xl':
                    return CssVariables.FontSizeXL;
                case 'xxl':
                    return CssVariables.FontSizeXXL;
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
        document.documentElement.style.setProperty(CssVariables.FontSizeXXS.match(CssVariables.RegExtractName)[0], this.xxs.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeXS.match(CssVariables.RegExtractName)[0], this.xs.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeSM.match(CssVariables.RegExtractName)[0], this.sm.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeMD.match(CssVariables.RegExtractName)[0], this.md.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeLG.match(CssVariables.RegExtractName)[0], this.lg.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeXL.match(CssVariables.RegExtractName)[0], this.xl.toRem());
        document.documentElement.style.setProperty(CssVariables.FontSizeXXL.match(CssVariables.RegExtractName)[0], this.xxl.toRem());
    }
    /**
     * Получить оптимальный размер тени в rem для указанного размера шрифта
     * @param value Размер шрифта
     * @returns Оптимальный размер тени в rem
     */
    getSizeShadow(value) {
        if (value) {
            switch (value) {
                case 'xxs':
                    return 0.03;
                case 'xs':
                case 'smaller':
                    return 0.05;
                case 'sm':
                case 'small':
                    return 0.07;
                case 'md':
                case 'medium':
                    return 0.085;
                case 'lg':
                case 'large':
                    return 0.1;
                case 'xl':
                    return 0.115;
                case 'xxl':
                    return 0.125;
            }
        }
        return 0.07;
    }
    /**
     * Получить оптимальный размер обводки в rem для указанного размера шрифта
     * @param value Размер шрифта
     * @returns Оптимальный размер обводки в rem
     */
    getSizeStroke(value) {
        if (value) {
            switch (value) {
                case 'xxs':
                    return 0.3;
                case 'xs':
                case 'smaller':
                    return 0.4;
                case 'sm':
                case 'small':
                    return 0.5;
                case 'md':
                case 'medium':
                    return 0.8;
                case 'lg':
                case 'large':
                    return 0.8;
                case 'xl':
                    return 1;
                case 'xxl':
                    return 1.2;
            }
        }
        return 0.07;
    }
}
//# sourceMappingURL=FontSizes.js.map