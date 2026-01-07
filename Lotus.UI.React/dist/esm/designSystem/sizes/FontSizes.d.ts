import { TCssFontSize } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные со шрифтами
 */
export declare class FontSizes extends SizeDimensions {
    /**
     * Стандартные размеры шрифтов
     */
    static readonly Default: FontSizes;
    /**
     * Получает корневой размер шрифта (font-size) документа
     * @returns число - размер шрифта html элемента в пикселях
     */
    static getRootFontSize(): number;
    /**
     * Получить значение шрифта через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssFontSize | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable(): void;
    /**
     * Получить оптимальный размер тени в rem для указанного размера шрифта
     * @param value Размер шрифта
     * @returns Оптимальный размер тени в rem
     */
    getSizeShadow(value?: string | number): number;
    /**
     * Получить оптимальный размер обводки в rem для указанного размера шрифта
     * @param value Размер шрифта
     * @returns Оптимальный размер обводки в rem
     */
    getSizeStroke(value?: string | number): number;
}
//# sourceMappingURL=FontSizes.d.ts.map