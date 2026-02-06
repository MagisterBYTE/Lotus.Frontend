/**
 * Класс реализующий методы генерации шума в двухмерном пространстве.
 */
export declare abstract class GenerationNoise2D {
    /**
     * Случайное число источника.
     */
    static seed: number;
    /**
     * Линейная интерполяция (аналог XMathInterpolation.Lerp).
     */
    private static lerp;
    /**
     * Целочисленная шумовая функция V2 (наиболее стабильная).
     */
    static noiseInteger2DV2(x: number, y: number): number;
    /**
     * Вещественная шумовая функция в диапазоне [0.0, 1.0].
     */
    static noiseSingle2DV2(x: number, y: number): number;
    /**
     * Вычисление значения сглаженного шума.
     * Использует фильтр окрестностей 3x3 для устранения резких артефактов.
     */
    static smoothNoiseSingle2D(x: number, y: number): number;
    /**
     * Вычисление интерполированного шума.
     * Реализует билинейную интерполяцию для получения плавных переходов.
     */
    static interpolatedNoiseSingle2D(x: number, y: number): number;
}
//# sourceMappingURL=GenerationNoise2D.d.ts.map