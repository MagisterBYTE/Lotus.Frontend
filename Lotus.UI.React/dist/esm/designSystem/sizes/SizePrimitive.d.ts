/**
 * Примитив для обозначения размера
 */
export declare class SizePrimitive {
    /**
     * Размер в пикселях
     */
    value: number;
    /**
     * Получение размер в пикселях в виде строки
     */
    get px(): string;
    /**
     * Получение размер в rem в виде строки
     */
    get rem(): string;
    constructor(value?: number);
    toNegativePixel(): string;
    toNegativeRem(): string;
}
//# sourceMappingURL=SizePrimitive.d.ts.map