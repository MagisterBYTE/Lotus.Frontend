import { TCssMargin } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с внутренним отступом
 */
export declare class MarginSizes extends SizeDimensions {
    /**
     * Стандартные размеры внутреннего отступа
     */
    static readonly Default: MarginSizes;
    /**
     * Получить значение внутреннего отступа через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssMargin | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=MarginSizes.d.ts.map