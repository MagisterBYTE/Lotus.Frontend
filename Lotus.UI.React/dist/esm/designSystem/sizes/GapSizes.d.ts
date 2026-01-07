import { TCssGap } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с расстоянием между элементами
 */
export declare class GapSizes extends SizeDimensions {
    /**
     * Стандартные расстояния между элементами
     */
    static readonly Default: GapSizes;
    /**
     * Получить значение расстояния через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssGap | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css.
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=GapSizes.d.ts.map