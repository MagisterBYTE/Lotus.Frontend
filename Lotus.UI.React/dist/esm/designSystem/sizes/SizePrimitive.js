/**
 * Примитив для обозначения размера
 */
export class SizePrimitive {
    // #region Fields
    /**
     * Размер в пикселях
     */
    value;
    // #endregion
    // #region Properties
    /**
     * Получение размер в пикселях в виде строки
     */
    get px() {
        return `${this.value}px`;
    }
    /**
     * Получение размер в rem в виде строки
     */
    get rem() {
        return `${this.value / 16}rem`;
    }
    // #endregion
    constructor(value) {
        this.value = value ?? 0;
    }
    toNegativePixel() {
        return `-${this.value}px`;
    }
    toNegativeRem() {
        return `-${this.value / 16}rem`;
    }
}
//# sourceMappingURL=SizePrimitive.js.map