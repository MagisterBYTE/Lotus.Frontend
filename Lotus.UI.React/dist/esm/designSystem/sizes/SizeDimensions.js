import { FontSizes } from './FontSizes';
import { SizePrimitive } from './SizePrimitive';
/**
 * Определение стандартной коллекции размеров
 */
export class SizeDimensions {
    // #region Fields
    xxs;
    xs;
    sm;
    md;
    lg;
    xl;
    xxl;
    // #endregion
    // eslint-disable-next-line max-params
    constructor(xxs, xs, sm, md, lg, xl, xxl) {
        this.xxs = new SizePrimitive(xxs);
        this.xs = new SizePrimitive(xs);
        this.sm = new SizePrimitive(sm);
        this.md = new SizePrimitive(md);
        this.lg = new SizePrimitive(lg);
        this.xl = new SizePrimitive(xl);
        this.xxl = new SizePrimitive(xxl);
    }
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toRem(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return `${value / 16}rem`;
        switch (value) {
            case 'xxs':
                return this.xxs.rem;
            case 'xs':
                return this.xs.rem;
            case 'sm':
                return this.sm.rem;
            case 'md':
                return this.md.rem;
            case 'lg':
                return this.lg.rem;
            case 'xl':
                return this.xl.rem;
            case 'xxl':
                return this.xxl.rem;
        }
        return value;
    }
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toCssNegative(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return `-${value}px`;
        switch (value) {
            case 'xxs':
                return this.xxs.toNegativeRem();
            case 'xs':
                return this.xs.toNegativeRem();
            case 'sm':
                return this.sm.toNegativeRem();
            case 'md':
                return this.md.toNegativeRem();
            case 'lg':
                return this.lg.toNegativeRem();
            case 'xl':
                return this.xl.toNegativeRem();
            case 'xxl':
                return this.xxl.toNegativeRem();
        }
        return value;
    }
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toCss(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return `${value}px`;
        switch (value) {
            case 'xxs':
                return this.xxs.rem;
            case 'xs':
                return this.xs.rem;
            case 'sm':
                return this.sm.rem;
            case 'md':
                return this.md.rem;
            case 'lg':
                return this.lg.rem;
            case 'xl':
                return this.xl.rem;
            case 'xxl':
                return this.xxl.rem;
        }
        return value;
    }
    /**
     * Конвертирует значение размера в пиксели в виде числа
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    toPixel(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return value;
        switch (value) {
            case 'xxs':
                return this.xxs.value;
            case 'xs':
                return this.xs.value;
            case 'sm':
                return this.sm.value;
            case 'md':
                return this.md.value;
            case 'lg':
                return this.lg.value;
            case 'xl':
                return this.xl.value;
            case 'xxl':
                return this.xxl.value;
        }
        const v = parseFloat(value);
        const unit = value.replace(value.toString(), '').toLowerCase();
        switch (unit) {
            case 'px':
                return v;
            case 'rem':
                return v * FontSizes.getRootFontSize();
            case 'em':
                // Для em нужно знать контекст, возвращаем приблизительное значение
                return v * 16; // предполагаем базовый размер 16px
            case 'pt':
                return v * 1.333; // 1pt = 1.333px
            case 'mm':
                return v * 3.7795; // 1mm = 3.7795px
            case 'cm':
                return v * 37.795; // 1cm = 37.795px
            case 'in':
                return v * 96; // 1inch = 96px
            case '%':
                return v * 16 / 100; // предполагаем базовый размер 16px
            default:
                // Если единица не распознана, возвращаем как есть (предполагаем px)
                return v;
        }
    }
}
//# sourceMappingURL=SizeDimensions.js.map