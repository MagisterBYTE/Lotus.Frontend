import { TCssBorderRadius } from '#types';
import { SizeDimensions } from './SizeDimensions';
/**
 * Размеры связанные с радиусом закругления
 */
export declare class RadiusSizes extends SizeDimensions {
    /**
     * Стандартные радиусы закругления
     */
    static readonly Default: RadiusSizes;
    /**
     * Получить значение радиуса закругления через переменную Css
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     */
    static getFromCssVariable(value?: string | number): TCssBorderRadius | undefined;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable(): void;
}
//# sourceMappingURL=RadiusSizes.d.ts.map