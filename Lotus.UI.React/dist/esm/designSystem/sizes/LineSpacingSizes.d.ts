import { TCssLineHeight } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с межстрочным интервалом
 */
export declare class LineSpacingSizes extends SizeDimensions {
    /**
     * Стандартные размеры межстрочного интервала
     */
    static readonly Default: LineSpacingSizes;
    /**
     * Получить значение межстрочного интервала через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssLineHeight | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=LineSpacingSizes.d.ts.map