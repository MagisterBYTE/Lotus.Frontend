/**
 * Примитив для обозначения размера
 */
export declare class SizePrimitive {
    /**
     * Конвертирует размера в пиксели
     * @param value Размер в различных единицах измерения (px, rem, em, pt, %, mm, cm, in) или число
     * @returns Значение размера в пикселях
     */
    static fromCss(value?: string | number): number | undefined;
    /**
     * Размер в пикселях
     */
    value: number;
    /**
     * Получение размер в пикселях
     */
    get px(): number;
    /**
     * Получение размер в rem
     */
    get rem(): number;
    /**
     * Получение размер в точках
     */
    get pt(): number;
    /**
     * Получение размер в миллиметрах
     */
    get mm(): number;
    /**
     * Получение размер в сантиметрах
     */
    get cm(): number;
    /**
     * Получение размер в дюймах
     */
    get inch(): number;
    constructor(value?: number);
    toPixel(): string;
    toPixelNegative(): string;
    toRem(): string;
    toRemNegative(): string;
    add(value?: string | number): SizePrimitive;
}
//# sourceMappingURL=SizePrimitive.d.ts.map