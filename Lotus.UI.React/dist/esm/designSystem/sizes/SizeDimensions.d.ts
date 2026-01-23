import { IDesignSystemItem } from '../types/DesignSystemItem';
import { SizePrimitive } from './SizePrimitive';
/**
 * Определение стандартной коллекции размеров
 */
export declare abstract class SizeDimensions implements IDesignSystemItem {
    xxs: SizePrimitive;
    xs: SizePrimitive;
    sm: SizePrimitive;
    md: SizePrimitive;
    lg: SizePrimitive;
    xl: SizePrimitive;
    xxl: SizePrimitive;
    constructor(xxs: number, xs: number, sm: number, md: number, lg: number, xl: number, xxl: number);
    /**
     * Применить текущие значения размера к соответствующим переменным Css. Смотреть класс CssVariables
     */
    abstract applyToCssVariable(): void;
    /**
     * Конвертирует значение размера в rem в виде числа
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде числа
     */
    toRem(value?: string | number): number | undefined;
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toRemCss(value?: string | number): string | undefined;
    /**
     * Конвертирует значение размера в пиксели в виде числа
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns число - размер в пикселях
     */
    toPixel(value?: string | number): number | undefined;
    /**
     * Конвертирует значение размера в пиксели в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в пикселях в виде строки
     */
    toPixelCss(value?: string | number): string | undefined;
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toCssNegative<TCssType = string>(value?: string | number): TCssType | undefined;
    /**
     * Конвертирует значение размера в rem в виде строки
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в rem в виде строки
     */
    toCss<TCssType = string>(value?: string | number): TCssType | undefined;
    /**
     * Конвертирует значение размера примитив размера
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера
     */
    toSizePrimitive(value?: string | number): SizePrimitive | undefined;
}
//# sourceMappingURL=SizeDimensions.d.ts.map