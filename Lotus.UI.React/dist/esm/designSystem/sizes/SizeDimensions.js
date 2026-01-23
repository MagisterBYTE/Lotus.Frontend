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
     * Конвертирует значение размера в rem в виде числа
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде числа
     */
    toRem(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return value / 16;
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
        const pixel = SizePrimitive.fromCss(value);
        return pixel / 16;
    }
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toRemCss(value) {
        const rem = this.toRem(value);
        if (rem) {
            return `${rem}rem`;
        }
        return undefined;
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
        const pixel = SizePrimitive.fromCss(value);
        return pixel;
    }
    /**
     * Конвертирует значение размера в пиксели в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в пикселях в виде строки
     */
    toPixelCss(value) {
        const pixel = this.toPixel(value);
        if (pixel) {
            return `${pixel}px`;
        }
        return undefined;
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
            return `-${value / 16}px`;
        switch (value) {
            case 'xxs':
                return this.xxs.toRemNegative();
            case 'xs':
                return this.xs.toRemNegative();
            case 'sm':
                return this.sm.toRemNegative();
            case 'md':
                return this.md.toRemNegative();
            case 'lg':
                return this.lg.toRemNegative();
            case 'xl':
                return this.xl.toRemNegative();
            case 'xxl':
                return this.xxl.toRemNegative();
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
            return `${value / 16}px`;
        switch (value) {
            case 'xxs':
                return this.xxs.toRem();
            case 'xs':
                return this.xs.toRem();
            case 'sm':
                return this.sm.toRem();
            case 'md':
                return this.md.toRem();
            case 'lg':
                return this.lg.toRem();
            case 'xl':
                return this.xl.toRem();
            case 'xxl':
                return this.xxl.toRem();
        }
        return value;
    }
    /**
     * Конвертирует значение размера примитив размера
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера
     */
    toSizePrimitive(value) {
        if (value === undefined)
            return undefined;
        if (typeof value === 'number')
            return new SizePrimitive(value);
        switch (value) {
            case 'xxs':
                return new SizePrimitive(this.xxs.value);
            case 'xs':
                return new SizePrimitive(this.xs.px);
            case 'sm':
                return new SizePrimitive(this.sm.px);
            case 'md':
                return new SizePrimitive(this.md.px);
            case 'lg':
                return new SizePrimitive(this.lg.px);
            case 'xl':
                return new SizePrimitive(this.xl.px);
            case 'xxl':
                return new SizePrimitive(this.xxl.px);
        }
        const pixel = SizePrimitive.fromCss(value);
        return new SizePrimitive(pixel);
    }
}
//# sourceMappingURL=SizeDimensions.js.map