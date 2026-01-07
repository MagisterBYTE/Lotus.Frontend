import { TCssPadding } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с внешним отступом
 */
export declare class PaddingSizes extends SizeDimensions {
    /**
     * Стандартные размеры внешнего отступа
     */
    static readonly Default: PaddingSizes;
    /**
     * Получить значение внешнего отступа через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssPadding | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=PaddingSizes.d.ts.map